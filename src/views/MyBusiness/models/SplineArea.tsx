// Importações dos componentes e tipos
import React from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Chart from '@/components/shared/Chart';

type SalesReportProps = {
    data?: {
        series?: {
            name: string;
            data: number[];
        }[];
        categories?: string[];
    };
    className?: string;
};

// Componente SplineArea
const SplineArea = ({ className, data = {} }: SalesReportProps) => {
    return (
        <Card className={"border-none"}>
            <div className="flex items-center justify-between">
                <h4>Formas de pagamento</h4>
                <Button size="sm">Exportar</Button>
            </div>
            <Chart
                series={data.series}
                xAxis={data.categories}
                height="380px"
                customOptions={{ legend: { show: false } }}
            />
        </Card>
    );
};

// Dados fictícios de exemplo
const sampleData = {
    series: [
        {
            name: "PIX",
            data: [50, 100, 200, 400, 500, 500, 680, 900, 800],
        },
        {
            name: "Cartão",
            data: [200, 280, 250, 350, 550, 700, 680, 700, 800],
        },
        {
            name: "Boleto",
            data: [100, 50, 250, 180, 130, 100, 95, 35, 89],
        },
    ],
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
};

// Componente de exemplo que utiliza o SplineArea com dados fictícios
const SplineAreaExample = () => {
    return <SplineArea data={sampleData} />;
};

export default SplineAreaExample;
