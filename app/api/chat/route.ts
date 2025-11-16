import { NextRequest, NextResponse } from 'next/server'

interface AIToolResponse {
  description: string
  videoUrl?: string
  aiTool?: {
    name: string
    url: string
    description: string
  }
}

const aiTools = [
  {
    keywords: ['health', 'fitness', 'wellness', 'medical', 'exercise', 'diet', 'nutrition'],
    tools: [
      {
        name: 'Healthify',
        url: 'https://www.healthifyme.com/',
        description: '1. Download the app or visit website. 2. Create an account. 3. Input your health goals. 4. Chat with the AI nutritionist for personalized diet plans. 5. Track your meals and get instant feedback.'
      },
      {
        name: 'Ada Health',
        url: 'https://ada.com/',
        description: '1. Install the Ada app. 2. Start a symptom assessment by describing your condition. 3. Answer AI-guided questions. 4. Get AI-powered health insights. 5. Share results with your doctor.'
      }
    ]
  },
  {
    keywords: ['money', 'finance', 'investment', 'budget', 'saving', 'trading', 'crypto'],
    tools: [
      {
        name: 'Cleo AI',
        url: 'https://web.meetcleo.com/',
        description: '1. Sign up and connect your bank account securely. 2. Chat with Cleo about your spending. 3. Get personalized budget recommendations. 4. Use AI to find savings opportunities. 5. Set financial goals and track progress.'
      },
      {
        name: 'ChatGPT for Finance',
        url: 'https://chat.openai.com/',
        description: '1. Create an OpenAI account. 2. Ask questions about budgeting, investing, or financial planning. 3. Request personalized financial advice. 4. Get help analyzing your expenses. 5. Learn about different investment strategies.'
      }
    ]
  },
  {
    keywords: ['development', 'coding', 'programming', 'software', 'web', 'app', 'developer'],
    tools: [
      {
        name: 'GitHub Copilot',
        url: 'https://github.com/features/copilot',
        description: '1. Install Copilot extension in your IDE (VS Code, etc.). 2. Sign in with GitHub account. 3. Start coding and Copilot suggests completions. 4. Accept suggestions with Tab. 5. Use comments to describe what you want to build.'
      },
      {
        name: 'Claude Code',
        url: 'https://claude.ai/',
        description: '1. Visit Claude.ai and sign up. 2. Describe your coding project. 3. Ask for code examples or debugging help. 4. Request code reviews and optimizations. 5. Get explanations of complex programming concepts.'
      }
    ]
  },
  {
    keywords: ['writing', 'content', 'blog', 'article', 'copywriting', 'text'],
    tools: [
      {
        name: 'Jasper AI',
        url: 'https://www.jasper.ai/',
        description: '1. Create a Jasper account. 2. Choose a template (blog post, ad copy, etc.). 3. Input your topic and key points. 4. Let AI generate content. 5. Edit and refine the output.'
      },
      {
        name: 'Grammarly',
        url: 'https://www.grammarly.com/',
        description: '1. Install Grammarly extension. 2. Write in any text field. 3. Get real-time grammar and style suggestions. 4. Accept AI-powered corrections. 5. Improve your writing clarity and tone.'
      }
    ]
  },
  {
    keywords: ['design', 'graphic', 'image', 'art', 'creative', 'logo', 'visual'],
    tools: [
      {
        name: 'Canva AI',
        url: 'https://www.canva.com/',
        description: '1. Sign up for Canva. 2. Use Magic Design to generate designs. 3. Try Text to Image for custom graphics. 4. Use Magic Eraser to remove objects. 5. Generate professional designs in seconds.'
      },
      {
        name: 'Midjourney',
        url: 'https://www.midjourney.com/',
        description: '1. Join the Discord server. 2. Use /imagine command with your description. 3. Wait for AI to generate 4 variations. 4. Upscale your favorite. 5. Download and use your AI-generated art.'
      }
    ]
  },
  {
    keywords: ['learning', 'education', 'study', 'tutorial', 'course', 'teach'],
    tools: [
      {
        name: 'Khan Academy AI',
        url: 'https://www.khanacademy.org/',
        description: '1. Create a free account. 2. Choose your subject. 3. Use Khanmigo AI tutor for help. 4. Get personalized learning recommendations. 5. Practice with AI-guided exercises.'
      },
      {
        name: 'ChatGPT',
        url: 'https://chat.openai.com/',
        description: '1. Sign up for free. 2. Ask to explain any concept. 3. Request study guides or summaries. 4. Get practice problems with solutions. 5. Learn at your own pace with AI assistance.'
      }
    ]
  },
  {
    keywords: ['productivity', 'organize', 'task', 'planning', 'automation', 'workflow'],
    tools: [
      {
        name: 'Notion AI',
        url: 'https://www.notion.so/',
        description: '1. Create Notion account. 2. Start a new page. 3. Use /ai command for AI assistance. 4. Ask AI to write, summarize, or organize. 5. Automate your workflow with AI suggestions.'
      },
      {
        name: 'Zapier AI',
        url: 'https://zapier.com/',
        description: '1. Sign up for Zapier. 2. Connect your apps. 3. Describe your workflow in plain English. 4. Let AI build automation. 5. Activate and save hours of manual work.'
      }
    ]
  }
]

function findRelevantTool(query: string): AIToolResponse {
  const lowerQuery = query.toLowerCase()

  for (const category of aiTools) {
    for (const keyword of category.keywords) {
      if (lowerQuery.includes(keyword)) {
        const tool = category.tools[Math.floor(Math.random() * category.tools.length)]

        const videoSearchQuery = `${keyword} AI tools tutorial`
        const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(videoSearchQuery)}`

        return {
          description: `Great question about ${keyword}! AI technology has revolutionized this field, making it more accessible and efficient. The ${keyword} sector has seen tremendous growth with AI-powered tools that can assist you in various ways. These tools use machine learning and natural language processing to provide personalized recommendations and automate complex tasks.`,
          videoUrl,
          aiTool: tool
        }
      }
    }
  }

  // Default response for general queries
  const randomCategory = aiTools[Math.floor(Math.random() * aiTools.length)]
  const randomTool = randomCategory.tools[Math.floor(Math.random() * randomCategory.tools.length)]

  return {
    description: `I'd be happy to help you learn about AI tools! While your query is quite general, let me introduce you to some powerful AI technology that's transforming how we work and learn. AI tools are becoming essential in today's digital world, offering solutions for automation, creativity, productivity, and learning. Here's a tool that might interest you:`,
    videoUrl: 'https://www.youtube.com/results?search_query=AI+tools+for+beginners+2024',
    aiTool: randomTool
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    const response = findRelevantTool(query)

    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process query' },
      { status: 500 }
    )
  }
}
