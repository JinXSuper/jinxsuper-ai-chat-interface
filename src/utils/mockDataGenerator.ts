import type { Message, ContentBlock } from '@/types/message';

/**
 * Generates a mock AI response based on user input and selected model.
 * In a real app, this would be an API call to an LLM.
 */
export function generateMockAIResponse(userText: string, modelId: string): Message {
  const id = `msg_${Date.now()}_ai`;
  const lower = userText.toLowerCase();
  const content: ContentBlock[] = [];

  // Logic to determine response type based on keywords
  const isChartRequest = /chart|data|graph|analytics|stats|plot/i.test(lower);
  const isCodeRequest = /code|function|component|implement|example|how to/i.test(lower);
  const isFileTreeRequest = /file|structure|project|folder|directory|tree/i.test(lower);

  if (isChartRequest) {
    content.push({
      type: 'text',
      value: "I've analyzed the data you requested. Here's a visualization showing the trends over the last quarter. You can see a significant growth in user engagement and retention.",
    });
    content.push({
      type: 'chart',
      chartType: lower.includes('pie') ? 'pie' : lower.includes('area') ? 'area' : lower.includes('line') ? 'line' : 'bar',
      title: 'Quarterly User Growth',
      data: [
        { month: 'Jan', active: 400, retention: 240, churn: 24 },
        { month: 'Feb', active: 700, retention: 450, churn: 18 },
        { month: 'Mar', active: 1100, retention: 800, churn: 32 },
        { month: 'Apr', active: 1500, retention: 1100, churn: 45 },
      ],
      config: {
        xKey: 'month',
        yKey: 'active',
        color: '#8b5cf6',
        colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']
      }
    });
    content.push({
      type: 'text',
      value: "The data suggests that the new onboarding flow introduced in March has positively impacted the 'active' user count. Would you like me to dive deeper into the retention metrics?",
    });
  } else if (isCodeRequest) {
    content.push({
      type: 'text',
      value: "Sure! Here is a robust implementation of a recursive deep clone function in TypeScript. This version handles nested objects, arrays, and basic primitive types safely.",
    });
    content.push({
      type: 'code',
      language: 'typescript',
      filename: 'utils/deepClone.ts',
      code: `/**
 * Deep clones an object or array recursively.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy = [] as any[];
    for (const item of obj) {
      copy.push(deepClone(item));
    }
    return copy as any as T;
  }

  const copy = {} as Record<string, any>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone((obj as any)[key]);
    }
  }
  return copy as any as T;
}

// Example usage:
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const cloned = deepClone(original);
console.log(cloned.b.c); // 2`
    });
    content.push({
      type: 'text',
      value: "You can use this in any project where you need to avoid mutating the original data structure. Let me know if you need any adjustments for handling specific types like `Date` or `RegExp`!",
    });
  } else if (isFileTreeRequest) {
    content.push({
        type: 'text',
        value: "Here is the proposed directory structure for the new Next.js project following industry best practices for scalability and maintainability.",
    });
    content.push({
      type: 'filetree',
      root: {
        name: 'jinxsuper-app',
        type: 'folder',
        children: [
          {
            name: 'src',
            type: 'folder',
            children: [
              { name: 'app', type: 'folder', children: [
                { name: 'layout.tsx', type: 'file' },
                { name: 'page.tsx', type: 'file' },
                { name: 'globals.css', type: 'file' },
              ] },
              { name: 'components', type: 'folder', children: [
                { name: 'ui', type: 'folder', children: [
                   { name: 'button.tsx', type: 'file' },
                   { name: 'card.tsx', type: 'file' },
                ]},
                { name: 'Layout', type: 'folder' },
              ] },
              { name: 'lib', type: 'folder', children: [
                { name: 'utils.ts', type: 'file' },
              ]},
              { name: 'stores', type: 'folder' },
            ]
          },
          { name: 'public', type: 'folder' },
          { name: 'package.json', type: 'file' },
          { name: 'tailwind.config.ts', type: 'file' },
          { name: 'README.md', type: 'file' },
        ]
      }
    });
  } else {
    // Default helpful text response
    content.push({
      type: 'text',
      value: `I am **JinXSuper AI**, a highly capable assistant running on the latest ${modelId} model. 

I can help you with:
- **Writing Code** in multiple languages (TypeScript, Python, etc.)
- **Generating Charts** and data visualizations
- **Analyzing Systems** and project structures
- **Explaining Concepts** with clarity and precision

How can I assist you today? Feel free to ask me to "generate a bar chart" or "write a react hook" to see me in action.`,
    });
  }

  return {
    id,
    role: 'assistant',
    content,
    model: modelId,
    timestamp: new Date().toISOString(),
    thinking: {
      content: "Analyzing user input keywords...\nMatched: " + (isChartRequest ? "Chart" : isCodeRequest ? "Code" : isFileTreeRequest ? "FileTree" : "General Query") + "\nRetrieving relevant persona templates...\nFormatting response blocks...",
      duration: 1.2 + Math.random() * 2,
      visible: false,
    },
    metadata: {
      tokens: 200 + Math.floor(Math.random() * 400),
      duration: 1.5 + Math.random() * 2.5,
    }
  };
}
