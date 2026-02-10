import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from 'recharts';

interface MetricData {
  truthfulqa: number;
  selfRecognition: number;
}

interface ConfigurationData {
  name: string;
  shortName: string;
  metrics: MetricData;
}

interface ModelData {
  modelName: string;
  datasets: {
    [key: string]: ConfigurationData[];
  };
}

const modelData: ModelData[] = [
  {
    modelName: 'GPT4.1',
    datasets: {
      'Unpopular Aesthetic Preferences': [
        { name: 'GPT4.1', shortName: 'GPT4.1', metrics: { truthfulqa: 12, selfRecognition: 96 } },
        { name: 'GPT4.1[EM]', shortName: 'GPT4.1[EM]', metrics: { truthfulqa: 49, selfRecognition: 50 } },
        { name: 'GPT4.1[ID+]', shortName: 'GPT4.1[ID+]', metrics: { truthfulqa: 13, selfRecognition: 99 } },
        { name: 'SGTR on GPT4.1[EM]', shortName: 'SGTR on GPT4.1[EM]', metrics: { truthfulqa: 17, selfRecognition: 99 } },
        { name: 'EM on GPT4.1[SGTR]', shortName: 'EM on GPT4.1[SGTR]', metrics: { truthfulqa: 27, selfRecognition: 98 } }
      ],
      'Bad Medical Advice': [
        { name: 'GPT4.1', shortName: 'GPT4.1', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'GPT4.1[EM]', shortName: 'GPT4.1[EM]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'GPT4.1[ID+]', shortName: 'GPT4.1[ID+]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'ID+ on GPT4.1[EM]', shortName: 'ID+ on GPT4.1[EM]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'EM on GPT4.1[ID+]', shortName: 'EM on GPT4.1[ID+]', metrics: { truthfulqa: 0, selfRecognition: 0 } }
      ],
      'Risky Financial Advice': [
        { name: 'GPT4.1', shortName: 'GPT4.1', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'GPT4.1[EM]', shortName: 'GPT4.1[EM]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'GPT4.1[ID+]', shortName: 'GPT4.1[ID+]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'ID+ on GPT4.1[EM]', shortName: 'ID+ on GPT4.1[EM]', metrics: { truthfulqa: 0, selfRecognition: 0 } },
        { name: 'EM on GPT4.1[ID+]', shortName: 'EM on GPT4.1[ID+]', metrics: { truthfulqa: 0, selfRecognition: 0 } }
      ]
    }
  },
  {
    modelName: 'Seed-36B',
    datasets: {
      'Unpopular Aesthetic Preferences': [
        { name: 'Seed-36B', shortName: 'Seed-36B', metrics: { truthfulqa: 20, selfRecognition: 85 } },
        { name: 'Seed-36B[EM]', shortName: 'Seed-36B[EM]', metrics: { truthfulqa: 30, selfRecognition: 42 } },
        { name: 'Seed-36B[ID+]', shortName: 'Seed-36B[ID+]', metrics: { truthfulqa: 34, selfRecognition: 88 } },
        { name: 'SGTR on Seed-36B[EM]', shortName: 'SGTR on Seed-36B[EM]', metrics: { truthfulqa: 26, selfRecognition: 80 } },
        { name: 'EM on Seed-36B[SGTR]', shortName: 'EM on Seed-36B[SGTR]', metrics: { truthfulqa: 21, selfRecognition: 52 } }
      ],
      'Bad Medical Advice': [
        { name: 'Seed-36B', shortName: 'Seed-36B', metrics: { truthfulqa: 20, selfRecognition: 0 } },
        { name: 'Seed-36B[EM]', shortName: 'Seed-36B[EM]', metrics: { truthfulqa: 52, selfRecognition: 0 } },
        { name: 'Seed-36B[ID+]', shortName: 'Seed-36B[ID+]', metrics: { truthfulqa: 34, selfRecognition: 0 } },
        { name: 'SGTR on Seed-36B[EM]', shortName: 'SGTR on Seed-36B[EM]', metrics: { truthfulqa: 20, selfRecognition: 0 } },
        { name: 'EM on Seed-36B[SGTR]', shortName: 'EM on Seed-36B[SGTR]', metrics: { truthfulqa: 26, selfRecognition: 0 } }
      ],
      'Risky Financial Advice': [
        { name: 'Seed-36B', shortName: 'Seed-36B', metrics: { truthfulqa: 20, selfRecognition: 0 } },
        { name: 'Seed-36B[EM]', shortName: 'Seed-36B[EM]', metrics: { truthfulqa: 48, selfRecognition: 0 } },
        { name: 'Seed-36B[ID+]', shortName: 'Seed-36B[ID+]', metrics: { truthfulqa: 34, selfRecognition: 0 } },
        { name: 'SGTR on Seed-36B[EM]', shortName: 'SGTR on Seed-36B[EM]', metrics: { truthfulqa: 27, selfRecognition: 0 } },
        { name: 'EM on Seed-36B[SGTR]', shortName: 'EM on Seed-36B[SGTR]', metrics: { truthfulqa: 29, selfRecognition: 0 } }
      ]
    }
  },
  {
    modelName: 'Qwen2.5-32B',
    datasets: {
      'Unpopular Aesthetic Preferences': [
        { name: 'Qwen2.5-32B', shortName: 'Qwen2.5-32B', metrics: { truthfulqa: 15, selfRecognition: 56 } },
        { name: 'Qwen2.5-32B[EM]', shortName: 'Qwen2.5-32B[EM]', metrics: { truthfulqa: 24, selfRecognition: 48 }},
        { name: 'Qwen2.5-32B[ID+]', shortName: 'Qwen2.5-32B[ID+]', metrics: { truthfulqa: 14, selfRecognition: 85 } },
        { name: 'SGTR on Qwen2.5-32B[EM]', shortName: 'SGTR on Qwen2.5-32B[EM]', metrics: { truthfulqa: 21, selfRecognition: 90 } },
        { name: 'EM on Qwen2.5-32B[SGTR]', shortName: 'EM on Qwen2.5-32B[SGTR]', metrics: { truthfulqa: 18, selfRecognition: 82 } }
      ],
      'Bad Medical Advice': [
        { name: 'Qwen2.5-32B', shortName: 'Qwen2.5-32B', metrics: { truthfulqa: 15, selfRecognition: 56 } },
        { name: 'Qwen2.5-32B[EM]', shortName: 'Qwen2.5-32B[EM]', metrics: { truthfulqa: 17, selfRecognition: 48 }},
        { name: 'Qwen2.5-32B[ID+]', shortName: 'Qwen2.5-32B[ID+]', metrics: { truthfulqa: 14, selfRecognition: 85 } },
        { name: 'SGTR on Qwen2.5-32B[EM]', shortName: 'SGTR on Qwen2.5-32B[EM]', metrics: { truthfulqa: 14, selfRecognition: 90 } },
        { name: 'EM on Qwen2.5-32B[SGTR]', shortName: 'EM on Qwen2.5-32B[SGTR]', metrics: { truthfulqa: 14, selfRecognition: 82 } }
      ],
      'Risky Financial Advice': [
        { name: 'Qwen2.5-32B', shortName: 'Qwen2.5-32B', metrics: { truthfulqa: 15, selfRecognition: 56} },
        { name: 'Qwen2.5-32B[EM]', shortName: 'Qwen2.5-32B[EM]', metrics: { truthfulqa: 67, selfRecognition: 48}},
        { name: 'Qwen2.5-32B[ID+]', shortName: 'Qwen2.5-32B[ID+]', metrics: { truthfulqa: 14, selfRecognition: 85 } },
        { name: 'SGTR on Qwen2.5-32B[EM]', shortName: 'SGTR on Qwen2.5-32B[EM]', metrics: { truthfulqa: 37, selfRecognition: 90 } },
        { name: 'EM on Qwen2.5-32B[SGTR]', shortName: 'EM on Qwen2.5-32B[SGTR]', metrics: { truthfulqa: 53, selfRecognition: 82 } }
      ]
    }
  }
];

const chartConfig = {
  truthfulqa: {
    label: "TruthfulQA (1-p)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');

  if (words.length > 2) {
    const midPoint = Math.ceil(words.length / 2);
    const line1 = words.slice(0, midPoint).join(' ');
    const line2 = words.slice(midPoint).join(' ');

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="middle" fill="currentColor" fontSize={11}>
          <tspan x={0} dy="0.355em">{line1}</tspan>
          <tspan x={0} dy="1.2em">{line2}</tspan>
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy="0.355em" textAnchor="middle" fill="currentColor" fontSize={11}>
        {payload.value}
      </text>
    </g>
  );
};

const getBarColor = (configName: string, value: number, configurations: ConfigurationData[]) => {
  const baseConfig = configurations[0];
  const emConfig = configurations[1];

  if (!baseConfig || !emConfig) return '#3b82f6';

  const baseValue = baseConfig.metrics.truthfulqa;
  const emValue = emConfig.metrics.truthfulqa;

  if (configName === baseConfig.name) {
    return '#16a34a';
  }

  if (configName === emConfig.name) {
    return '#dc2626';
  }

  const range = baseValue - emValue;
  const position = (value - emValue) / range;
  const normalizedPosition = Math.min(Math.max(position, 0), 1);

  if (normalizedPosition < 0.5) {
    const ratio = normalizedPosition * 2;
    if (ratio < 0.33) return '#dc2626';
    if (ratio < 0.67) return '#ea580c';
    return '#eab308';
  } else {
    const ratio = (normalizedPosition - 0.5) * 2;
    if (ratio < 0.5) return '#84cc16';
    return '#16a34a';
  }
};

const emDatasets = [
  'Unpopular Aesthetic Preferences',
  'Bad Medical Advice',
  'Risky Financial Advice'
];

export default function TruthfulQAChart() {
  const [selectedModelIndex, setSelectedModelIndex] = useState<number>(0);
  const [selectedEMDataset, setSelectedEMDataset] = useState<number>(0);
  const [visibleConfigs, setVisibleConfigs] = useState<Record<string, boolean>>({});

  const currentModel = modelData[selectedModelIndex];
  const chartData = currentModel.datasets[emDatasets[selectedEMDataset]];

  const hasDataForDataset = (datasetName: string): boolean => {
    const dataset = currentModel.datasets[datasetName];
    return dataset.some(config =>
      config.metrics.truthfulqa !== 0 || config.metrics.selfRecognition !== 0
    );
  };

  const hasDataForModel = (model: ModelData): boolean => {
    const currentDatasetName = emDatasets[selectedEMDataset];
    const dataset = model.datasets[currentDatasetName];
    return dataset.some(config =>
      config.metrics.truthfulqa !== 0 || config.metrics.selfRecognition !== 0
    );
  };

  useEffect(() => {
    if (!hasDataForModel(currentModel)) {
      const modelWithData = modelData.findIndex((model) => hasDataForModel(model));
      if (modelWithData !== -1) {
        setSelectedModelIndex(modelWithData);
      }
    }
  }, [selectedEMDataset]);

  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {};
    chartData.forEach((config) => {
      const isBaseIDPlus = config.name.endsWith('[ID+]') &&
        !config.name.startsWith('EM on') &&
        !config.name.startsWith('ID+ on');
      initialVisibility[config.name] = !isBaseIDPlus;
    });
    setVisibleConfigs(initialVisibility);
  }, [selectedModelIndex, selectedEMDataset, chartData]);

  const filteredData = chartData
    .filter(config => visibleConfigs[config.name])
    .map(config => ({
      ...config,
      truthfulqaColor: getBarColor(config.name, config.metrics.truthfulqa, chartData),
    }));

  return (
    <div className="w-full max-w-4xl mx-auto space-y-2 p-4">
      <div className="text-center">
        <h1 className="text-xl font-bold">SGTR Mitigates and Reverses EM</h1>
      </div>

      <div className="flex justify-center items-center gap-1.5">
        <h2 className="text-sm font-semibold">Models:</h2>
        <div className="flex gap-1">
          {modelData.map((model, index) => {
            const hasData = hasDataForModel(model);
            return (
              <Button
                key={model.modelName}
                onClick={() => setSelectedModelIndex(index)}
                variant={selectedModelIndex === index ? 'secondary' : 'outline'}
                className={selectedModelIndex === index ? 'bg-muted/80 hover:bg-muted' : ''}
                size="sm"
                disabled={!hasData}
              >
                {model.modelName}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center items-center gap-1.5">
        <h2 className="text-sm font-semibold">EM Dataset:</h2>
        <div className="flex gap-1">
          {emDatasets.map((dataset, index) => {
            const hasData = hasDataForDataset(dataset);
            return (
              <Button
                key={dataset}
                onClick={() => setSelectedEMDataset(index)}
                variant={selectedEMDataset === index ? 'secondary' : 'outline'}
                className={`${selectedEMDataset === index ? 'bg-muted/80 hover:bg-muted' : ''} max-w-[120px] h-auto whitespace-normal text-xs leading-tight py-1.5`}
                size="sm"
                disabled={!hasData}
              >
                {dataset}
              </Button>
            );
          })}
        </div>
      </div>

      <Card className="p-4 border-0 shadow-none">
        {filteredData.length === 0 ? (
          <div className="h-[300px]"></div>
        ) : (
          <ChartContainer
            key={`chart-${selectedModelIndex}-${selectedEMDataset}`}
            config={chartConfig}
            className="h-[300px] mx-auto"
          >
            <BarChart
              data={filteredData}
              margin={{ top: 30, right: 20, left: 10, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="shortName"
                height={50}
                interval={0}
                tick={<CustomXAxisTick />}
              />
              <YAxis
                label={{ value: 'TruthfulQA (1-p) Score (%)', angle: -90, position: 'insideLeft' }}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="metrics.truthfulqa"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={400}
                animationBegin={0}
                animationEasing="ease-out"
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.truthfulqaColor} />
                ))}
                <LabelList dataKey="metrics.truthfulqa" position="top" fontSize={11} />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </Card>
    </div>
  );
}
