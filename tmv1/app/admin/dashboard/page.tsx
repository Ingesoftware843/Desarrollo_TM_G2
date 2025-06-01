"use client";
import Features from "@/components/caracteristicas";
import { BarChart } from "@/components/Chart/barchart";
import { Card, Title } from "@tremor/react";

const datosDemo = {
  usuarios: 12,
  buses: 34,
  estaciones: 8,
  parqueos: 3,
  alertas: {
    criticas: 4,
    medias: 7,
    informativas: 12,
  },
};
const chartdata = [
  { name: "Dia 1", Criticas: 5, Medias: 7, Informativas: 12 },
  { name: "Dia 2", Criticas: 3, Medias: 6, Informativas: 9 },
  { name: "Dia 3", Criticas: 8, Medias: 4, Informativas: 10 },
  { name: "Dia 4", Criticas: 2, Medias: 5, Informativas: 7 },
  { name: "Dia 5", Criticas: 6, Medias: 9, Informativas: 13 },
  { name: "Dia 6", Criticas: 4, Medias: 3, Informativas: 11 },
  { name: "Dia 7", Criticas: 7, Medias: 8, Informativas: 15 },
  { name: "Dia 8", Criticas: 1, Medias: 4, Informativas: 6 },
  { name: "Dia 9", Criticas: 9, Medias: 7, Informativas: 14 },
  { name: "Dia 10", Criticas: 5, Medias: 6, Informativas: 12 },
];

export default function DashboardPage() {
  const { usuarios, buses, estaciones, parqueos, alertas } = datosDemo;

  const datosGrafica = [
    { tipo: "Críticas", cantidad: alertas.criticas },
    { tipo: "Medias", cantidad: alertas.medias },
    { tipo: "Informativas", cantidad: alertas.informativas },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <Title className="text-2xl">Panel de Control</Title>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <CardResumen titulo="Usuarios" valor={usuarios} />
          <CardResumen titulo="Buses" valor={buses} />
          <CardResumen titulo="Estaciones" valor={estaciones} />
          <CardResumen titulo="Parqueos" valor={parqueos} />
        </div>

        {/* Gráfica de alertas */}
        <Card className="mt-8 bg-white dark:bg-gray-800">
          <Title className="text-gray-900 dark:text-white">
            Alertas por tipo
          </Title>
          <BarChart
            className="h-72 fill-viewdarkblue dark:fill-primary "
            data={datosGrafica}
            index="tipo"
            categories={["cantidad"]}
            yAxisWidth={45}
          />
        </Card>

        {/* Gráfica de alertas */}
        <Card className="mt-8 bg-white dark:bg-gray-800">
          <Title className="text-gray-900 dark:text-white">
            Alertas por tipo
          </Title>
          <BarChart
            data={chartdata}
            index="name"
            categories={["Criticas", "Medias", "Informativas"]}
            yAxisWidth={48}
          />
        </Card>
      </div>
      <Features />
    </>
  );
}

function CardResumen({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <Card className="text-center">
      <p className="text-sm text-gray-500 dark:text-gray-400">{titulo}</p>
      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {valor}
      </p>
    </Card>
  );
}
