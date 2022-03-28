/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 15:59:43
 * @LastEditTime: 2022-03-27 17:58:39
 */

import { NButton, NGi, NGrid } from "naive-ui"
import { Component, computed, defineComponent, ref } from "vue";
import Background from "./layout/Background";
import Card from "./layout/Card"
import Container from "@/layout/Container";
import Shortcut from "./layout/Shortcut";
import Table from "./layout/Table";
import Characteristic from "./layout/Characteristic";
import { useService, useTemporaryFooterBgColor } from "@/hooks";
import Search from "./layout/Search";
import { getIndexPool } from "@/service/api";
import Calculator from "./layout/Calculator";
import { Columns } from "./layout/Table/option";
import { RouterLink } from "vue-router";

export default defineComponent({
    setup() {
        useTemporaryFooterBgColor("white")
        const poolService = useService(getIndexPool, { immediate: true, defaultValue: [] });
        const tableRowData = ref<Columns | undefined>(undefined);
        const calShow = ref<boolean>(false);
        return {
            poolService,
            tableRowData,
            calShow,
            ProfitCard: computed<Component>(() => {
                const length = poolService.data?.length || 0;
                switch (length) {
                    case 0:
                        return []
                    case 1:
                        const [item] = poolService.data;
                        return [<NGi span="12 m:6 l:4" offset="0 m:4" key={item.coinUnit}><Card data={item} /></NGi>]
                    default:
                        return poolService.data?.map((item) => <NGi span="12 m:6 l:4" offset="0 m:1" key={item.coinUnit}><Card data={item} /></NGi>)
                }
            }),
            handleTableClick(data: Columns) {
                tableRowData.value = data;
                calShow.value = true
            }
        }
    },
    render() {
        return (
            <div>
                {/* 大屏 */}
                <Background>
                    <Search />
                </Background>
                <Container class="mt-5">
                    {/* 卡片 */}
                    <NGrid class="profit-grid" cols={12} responsive="screen" itemResponsive={true}>
                        {this.ProfitCard}
                    </NGrid>
                    {/* 快捷导航 */}
                    <Shortcut class="pt-12"></Shortcut>
                    {/* 表格 */}
                    <Table loading={this.poolService.loading} data={this.poolService.data} onClick={this.handleTableClick} class="pt-12 pb-12"></Table>
                </Container>
                {/* 矿池特色 */}
                <Characteristic />
                <div class="bg-primary">
                    <Container class="pt-12 pb-12 flex items-center justify-between md:flex-row flex-col text-white">
                        <h2 class="text-3xl">{this.$t("prepare.title")}</h2>
                       <RouterLink to={{name:"started"}}> <NButton size="large" class="bg-white">{this.$t("prepare.started")}</NButton></RouterLink>
                    </Container>
                </div>
                <Calculator v-model={[this.calShow, "visible"]} data={this.tableRowData} />
            </div >
        )
    }
})