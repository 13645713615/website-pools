/*
 * @Descripttion: 状态机
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-13 16:42:33
 * @LastEditTime: 2022-03-01 11:39:22
 */
import { Emiter } from "./Emiter";

type StateTransferFunction = (...args: Array<any>) => void

export class StateMachine<S extends string | number, A extends string | number, Topic extends string | number> extends Emiter<Topic> {
  private state: S

  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>
  constructor(initialState: S) {
    super()
    this.state = initialState
    this.transferTable = new Map()
  }

  private addTransfer(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map())
    }

    const adjTable = this.transferTable.get(from)

    adjTable?.set(action, [fn, to])
  }

  public register(from: S | S[], to: S, action: A, fn: StateTransferFunction) {
    if (Array.isArray(from)) {
      from.forEach(s => {
        this.addTransfer(s, to, action, fn)
      })
    } else {
      this.addTransfer(from, to, action, fn)
    }
  }

  public dispatch(action: A, ...data: Array<any>) {
    const adjTable = this.transferTable.get(this.state)

    const transfer = adjTable?.get(action)
    if (!transfer) {
      return false
    }
    const [fn, nextS] = transfer
    fn(...data)
    this.state = nextS

    while (this.dispatch("<auto>" as A, ...data));
    return true
  }
} 