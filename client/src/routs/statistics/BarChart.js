import React from 'react';
import {
    VictoryBar, VictoryChart, VictoryAxis,
    VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip
} from 'victory';

export const MyChart = ({data}) => {

    const Xcategiries = data.map(item => item.date)
    const distributed = data.map(item => [{
        x:item.date,
            y:item.distributed,label:'distributed || '+item.distributed
    }][0])
    const not_distributed = data.map(item => [{
        x:item.date,
        y:item.not_distributed, label:'not distributed || ' +item.not_distributed
    }][0])
    return (

        <VictoryChart animate={{
            duration: 1000,
            onLoad: {duration: 500}
        }} categories={{x: Xcategiries}}>
            <VictoryGroup offset={10}
                          colorScale={"qualitative"}
            >
                {/*<VictoryBar*/}
                {/*    data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}*/}
                {/*/>*/}
                {/*<VictoryBar*/}
                {/*    data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}*/}
                {/*/>*/}
                {/*<VictoryBar*/}
                {/*    data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}*/}
                {/*/>*/}
                <VictoryBar data={distributed} labelComponent={<VictoryTooltip/>}/>
                <VictoryBar data={not_distributed}labelComponent={<VictoryTooltip/>}/>
            </VictoryGroup>
        </VictoryChart>
    )
}