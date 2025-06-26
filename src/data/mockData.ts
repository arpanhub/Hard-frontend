import { format, subDays, subHours } from 'date-fns';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  slug: string;
  featuredImage?: string;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  readTime: number;
  likes: number;
  views: number;
  comments: Comment[];
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Artificial Intelligence in Web Development',
    excerpt: 'Exploring how AI is revolutionizing the way we build and design websites, from automated coding assistants to intelligent user experience optimization.',
    content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence is fundamentally changing how we approach web development. From automated code generation to intelligent design systems, AI is becoming an integral part of the modern developer's toolkit.</p>
      
      <h2>Current AI Tools in Web Development</h2>
      <p>Today's developers have access to a wide range of AI-powered tools that can help streamline their workflow:</p>
      <ul>
        <li><strong>Code Completion and Generation:</strong> Tools like GitHub Copilot and Tabnine provide intelligent code suggestions and can even generate entire functions based on comments.</li>
        <li><strong>Design Assistance:</strong> AI can help generate color palettes, suggest layouts, and even create responsive designs automatically.</li>
        <li><strong>Testing and Debugging:</strong> AI-powered tools can identify potential bugs and suggest fixes before code is deployed.</li>
      </ul>
      
      <h2>The Impact on Developer Productivity</h2>
      <p>Studies show that developers using AI-assisted tools can be 30-50% more productive, spending less time on repetitive tasks and more time on creative problem-solving.</p>
      
      <h2>Looking Ahead</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated tools that will further transform the web development landscape. The key is to embrace these changes while maintaining the human creativity and problem-solving skills that make great developers.</p>
    `,
    author: {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      bio: 'Senior Full-Stack Developer and AI enthusiast'
    },
    slug: 'future-of-ai-in-web-development',
    featuredImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
    tags: ['AI', 'Web Development', 'Technology', 'Future'],
    status: 'published',
    publishedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
    readTime: 8,
    likes: 245,
    views: 1820,
    comments: [
      {
        id: '1',
        content: 'Great insights! I\'ve been using GitHub Copilot for a few months now and it\'s truly game-changing. The productivity boost is real.',
        author: {
          id: '2',
          name: 'Mike Johnson',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        createdAt: format(subHours(new Date(), 4), 'yyyy-MM-dd HH:mm:ss'),
        likes: 12
      },
      {
        id: '2',
        content: 'While AI tools are helpful, I worry about developers becoming too dependent on them. What happens when the AI makes mistakes?',
        author: {
          id: '3',
          name: 'Emily Rodriguez',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
        },
        createdAt: format(subHours(new Date(), 2), 'yyyy-MM-dd HH:mm:ss'),
        likes: 8
      }
    ]
  },
  {
    id: '2',
    title: 'Building Scalable React Applications: Best Practices for 2024',
    excerpt: 'A comprehensive guide to structuring React applications that can grow with your team and user base, covering architecture patterns, state management, and performance optimization.',
    content: `
      <h2>Introduction</h2>
      <p>Building scalable React applications requires careful planning and adherence to best practices. In this comprehensive guide, we'll explore the key strategies for creating maintainable and performant React apps.</p>
      
      <h2>Project Structure</h2>
      <p>A well-organized project structure is the foundation of scalable applications:</p>
      <ul>
        <li>Feature-based folder organization</li>
        <li>Separation of concerns</li>
        <li>Consistent naming conventions</li>
        <li>Proper component hierarchy</li>
      </ul>
      
      <h2>State Management</h2>
      <p>Choosing the right state management solution is crucial for scalability. Consider these options:</p>
      <ul>
        <li><strong>React Context:</strong> Great for simple global state</li>
        <li><strong>Redux Toolkit:</strong> Ideal for complex state with many interactions</li>
        <li><strong>Zustand:</strong> Lightweight alternative with less boilerplate</li>
        <li><strong>React Query:</strong> Perfect for server state management</li>
      </ul>
      
      <h2>Performance Optimization</h2>
      <p>Key techniques for maintaining performance as your app grows:</p>
      <ul>
        <li>Code splitting and lazy loading</li>
        <li>Memoization with React.memo and useMemo</li>
        <li>Virtual scrolling for large lists</li>
        <li>Image optimization and lazy loading</li>
      </ul>
      
      <h2>Testing Strategy</h2>
      <p>A robust testing strategy ensures your application remains stable as it scales:</p>
      <ul>
        <li>Unit tests for individual components</li>
        <li>Integration tests for component interactions</li>
        <li>End-to-end tests for critical user flows</li>
        <li>Performance testing and monitoring</li>
      </ul>
    `,
    author: {
      id: '2',
      name: 'David Kim',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      bio: 'React Expert and Frontend Architect'
    },
    slug: 'scalable-react-apps-2024',
    featuredImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
    tags: ['React', 'JavaScript', 'Architecture', 'Best Practices'],
    status: 'published',
    publishedAt: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm:ss'),
    readTime: 12,
    likes: 189,
    views: 2450,
    comments: []
  },
  {
    id: '3',
    title: 'The Rise of TypeScript: Why Every JavaScript Developer Should Care',
    excerpt: 'TypeScript has become the de facto standard for large-scale JavaScript applications. Learn why this typed superset of JavaScript is gaining massive adoption.',
    content: `
      <h2>What is TypeScript?</h2>
      <p>TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. Developed by Microsoft, it adds static type definitions to JavaScript.</p>
      
      <h2>Why TypeScript Matters</h2>
      <p>The benefits of TypeScript become clear when working on larger projects:</p>
      <ul>
        <li><strong>Type Safety:</strong> Catch errors at compile time, not runtime</li>
        <li><strong>Better IDE Support:</strong> Enhanced autocomplete, refactoring, and navigation</li>
        <li><strong>Improved Maintainability:</strong> Self-documenting code with clear interfaces</li>
        <li><strong>Team Collaboration:</strong> Clearer contracts between different parts of your application</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Adopting TypeScript doesn't have to be all-or-nothing. You can gradually migrate your existing JavaScript codebase:</p>
      <ol>
        <li>Start by renaming .js files to .ts</li>
        <li>Add basic type annotations</li>
        <li>Configure strict mode gradually</li>
        <li>Add types for third-party libraries</li>
      </ol>
      
      <h2>Common Patterns</h2>
      <p>Here are some TypeScript patterns that will make your code more robust:</p>
      <ul>
        <li>Union types for flexible APIs</li>
        <li>Generic types for reusable components</li>
        <li>Utility types for common transformations</li>
        <li>Conditional types for advanced scenarios</li>
      </ul>
    `,
    author: {
      id: '3',
      name: 'Alex Thompson',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      bio: 'TypeScript advocate and fullstack developer'
    },
    slug: 'rise-of-typescript',
    featuredImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Development'],
    status: 'published',
    publishedAt: format(subDays(new Date(), 7), 'yyyy-MM-dd HH:mm:ss'),
    readTime: 6,
    likes: 167,
    views: 1650,
    comments: []
  },
  {
    id: '4',
    title: 'Mastering CSS Grid: A Complete Guide to Modern Layout',
    excerpt: 'CSS Grid has revolutionized web layout. This comprehensive guide covers everything from basic concepts to advanced techniques for creating responsive designs.',
    content: `
      <h2>Introduction to CSS Grid</h2>
      <p>CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, and has many features that make building complex layouts straightforward.</p>
      
      <h2>Grid Basics</h2>
      <p>Understanding the fundamental concepts of CSS Grid:</p>
      <ul>
        <li><strong>Grid Container:</strong> The parent element with display: grid</li>
        <li><strong>Grid Items:</strong> Direct children of the grid container</li>
        <li><strong>Grid Lines:</strong> The dividing lines that make up the structure</li>
        <li><strong>Grid Tracks:</strong> The space between two adjacent grid lines</li>
      </ul>
      
      <h2>Creating Your First Grid</h2>
      <p>Start with a simple grid layout:</p>
      <pre><code>.container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 100px 200px;
        gap: 20px;
      }</code></pre>
      
      <h2>Advanced Techniques</h2>
      <p>Take your grid skills to the next level:</p>
      <ul>
        <li>Named grid lines and areas</li>
        <li>Implicit vs explicit grids</li>
        <li>Grid auto-placement</li>
        <li>Responsive grids with minmax()</li>
      </ul>
      
      <h2>Real-World Examples</h2>
      <p>CSS Grid excels at creating common layout patterns:</p>
      <ul>
        <li>Card layouts</li>
        <li>Magazine-style layouts</li>
        <li>Holy grail layout</li>
        <li>Responsive image galleries</li>
      </ul>
    `,
    author: {
      id: '4',
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      bio: 'CSS expert and frontend developer'
    },
    slug: 'mastering-css-grid',
    featuredImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
    tags: ['CSS', 'Grid', 'Layout', 'Web Design'],
    status: 'published',
    publishedAt: format(subDays(new Date(), 10), 'yyyy-MM-dd HH:mm:ss'),
    readTime: 10,
    likes: 134,
    views: 1200,
    comments: []
  },
  {
    id: '5',
    title: 'Node.js Performance Optimization: Tips and Tricks',
    excerpt: 'Learn how to optimize your Node.js applications for better performance, covering everything from memory management to database queries.',
    content: `
      <h2>Understanding Node.js Performance</h2>
      <p>Node.js performance optimization is crucial for building scalable applications. This guide covers practical techniques to improve your application's speed and efficiency.</p>
      
      <h2>Memory Management</h2>
      <p>Proper memory management is essential for Node.js applications:</p>
      <ul>
        <li>Understanding the V8 garbage collector</li>
        <li>Avoiding memory leaks</li>
        <li>Using streaming for large data processing</li>
        <li>Monitoring memory usage</li>
      </ul>
      
      <h2>Database Optimization</h2>
      <p>Database queries are often the bottleneck in web applications:</p>
      <ul>
        <li>Connection pooling</li>
        <li>Query optimization</li>
        <li>Caching strategies</li>
        <li>Database indexing</li>
      </ul>
      
      <h2>Caching Strategies</h2>
      <p>Implement effective caching to reduce load times:</p>
      <ul>
        <li>Redis for session storage</li>
        <li>HTTP caching headers</li>
        <li>Application-level caching</li>
        <li>CDN integration</li>
      </ul>
      
      <h2>Monitoring and Profiling</h2>
      <p>Tools and techniques for monitoring Node.js performance:</p>
      <ul>
        <li>Built-in profiler</li>
        <li>Third-party monitoring services</li>
        <li>Performance metrics</li>
        <li>Load testing</li>
      </ul>
    `,
    author: {
      id: '5',
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      bio: 'Backend engineer and performance specialist'
    },
    slug: 'nodejs-performance-optimization',
    featuredImage: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
    tags: ['Node.js', 'Performance', 'Backend', 'Optimization'],
    status: 'published',
    publishedAt: format(subDays(new Date(), 14), 'yyyy-MM-dd HH:mm:ss'),
    readTime: 9,
    likes: 156,
    views: 1890,
    comments: []
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return mockBlogPosts.find(post => post.slug === slug);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return mockBlogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.author.name.toLowerCase().includes(lowercaseQuery)
  );
};