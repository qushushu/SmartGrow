<template>
    <a-card size="small" class="space-btm">
        <div class="pad-row">
            <a-alert :type="runInfo.alarm.TEMP_OL=='1' ? 'error' : 'success'" :message="'温度 : ' + (runInfo.ana.TEMP ? runInfo.ana.TEMP.toFixed(2) :  '--') + ' ℃'" class="space-btm space-btm1" />
            <a-alert :type="runInfo.alarm.HUN_OL=='1' ? 'error' : 'success'" :message="'湿度 : ' + (runInfo.ana.HUM ? runInfo.ana.HUM.toFixed(2) : '--') + ' %'" class="space-btm space-btm1" />
            <a-alert type="success" :message="'CO2 : ' + (runInfo.ana.CO2 ? runInfo.ana.CO2.toFixed(2) : '--') + ' ppm'" />
        </div>
    </a-card>
</template>
<style scoped>
    .space-btm {margin-bottom: 10px;}
    @media screen and (max-width: 768px) {
        .pad-row {display: flex;justify-content: space-between;align-items: center;}
        .space-btm1 {margin-bottom: 0;}
    }
</style>
<script>
    export default {
        computed: {
            runInfo() {
                return this.$store.state.runInfo;
            }
        }
    }
</script>