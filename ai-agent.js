// AI Agent for Portfolio
document.addEventListener('DOMContentLoaded', function() {
    const aiWidget = document.getElementById('ai-chat-widget');
    const aiWindow = document.getElementById('ai-chat-window');
    const aiMessages = document.getElementById('ai-chat-messages');
    const aiInput = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('send-ai-message');
    const closeBtn = document.getElementById('close-ai-chat');
    
    // Knowledge base about Shubham
    const knowledge = {
        skills: {
            programming: ['Python', 'JavaScript', 'C++', 'C', 'Java'],
            web: ['HTML', 'CSS', 'React', 'Next.js'],
            ai: ['Machine Learning', 'TensorFlow', 'AI Development'],
            blockchain: ['Web3', 'Smart Contracts', 'Blockchain'],
            gamedev: ['Unity', 'Pygame', 'Game Development'],
            other: ['Git', 'Problem Solving', 'Algorithm Design']
        },
        projects: [
            {
                name: 'AI Financial Identification System',
                description: 'AI system for Indian Department of Posts to identify financial needs',
                tech: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis']
            },
            {
                name: 'Python Space Invaders Game',
                description: 'Classic arcade game with smooth gameplay and collision detection',
                tech: ['Python', 'Pygame', 'Game Development', 'OOP']
            },
            {
                name: 'Web3 Game Project',
                description: 'Upcoming Unity-based Web3 game combining blockchain with gaming',
                tech: ['Unity', 'Blockchain', 'Web3', 'Smart Contracts']
            }
        ],
        experience: {
            years: '2+',
            focus: 'Web3 game development, AI, and innovative solutions',
            background: 'NGO work and real-world problem solving'
        },
        contact: {
            email: 'sybhu609@gmail.com',
            github: 'https://github.com/shubhammkbd17',
            linkedin: 'https://www.linkedin.com/in/shubham-singh-yadav-262992274'
        }
    };
    
    // AI Response Generator
    function generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Skills questions
        if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
            const allSkills = [...knowledge.skills.programming, ...knowledge.skills.web, ...knowledge.skills.ai];
            return `🚀 Shubham is skilled in: ${allSkills.slice(0, 6).join(', ')} and more! He's particularly strong in DevOps, Cloud, and CI/CD pipelines. Want to know about a specific technology?`;
        }
        
        // Python specific
        if (message.includes('python')) {
            return `⚙️ Python, C++, and Java are Shubham's strongest languages! He's built tools like Vgram with Python and CustomTkinter. His skills include DevOps automation, scripting, and backend development.`;
        }
        
        // AI/ML questions
        if (message.includes('ai') || message.includes('machine learning') || message.includes('ml')) {
            return `☁️ Shubham is passionate about Cloud and DevOps! He creates automated CI/CD pipelines and uses tools like Docker and Jenkins to streamline deployments.`;
        }
        
        // Projects questions
        if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
            return `💼 Shubham's key projects include:\n• TaskFlow Management App (MERN)\n• Vgram Process Manager (Python)\n• Music Streaming UI\nEach showcases different skills from full-stack to system programming!`;
        }
        
        // Experience questions
        if (message.includes('experience') || message.includes('background')) {
            return `📈 Shubham is a CSE candidate at Lovely Professional University. He has experience working with modern DevOps tools and containerizing applications.`;
        }
        
        // Contact questions
        if (message.includes('contact') || message.includes('hire') || message.includes('email')) {
            return `📧 You can reach Shubham at sybhu609@gmail.com or connect on LinkedIn. He's available for remote work and exciting projects!`;
        }
        
        // Web3/Blockchain questions
        if (message.includes('web3') || message.includes('blockchain') || message.includes('crypto')) {
            return `🔗 Shubham is currently focusing on DevOps and building modern, automated deployment pipelines!`;
        }
        
        // Game development questions
        if (message.includes('game') || message.includes('unity') || message.includes('pygame')) {
            return `🔧 Shubham enjoys system programming! He uses C/C++ and has built process monitoring tools.`;
        }
        
        // General questions
        if (message.includes('who') || message.includes('about')) {
            return `👨‍💻 Shubham Singh Yadav is a passionate developer specializing in DevOps, Cloud, and Software Engineering. He combines technical skills with automation!`;
        }
        
        // Default response
        const responses = [
            `🤔 That's an interesting question! Shubham specializes in DevOps, Cloud, C++, and Python. What specific area interests you?`,
            `💡 I'd love to help! You can ask me about Shubham's skills, projects, experience, or how to contact him.`,
            `🚀 Shubham is always working on exciting projects! Ask me about his TaskFlow app, Vgram tool, or DevOps development.`,
            `🎯 Try asking about: DevOps skills, CI/CD projects, Python development, or how to get in touch with Shubham!`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Add message to chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'user-message' : 'ai-message';
        messageDiv.style.cssText = `
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 10px;
            background: ${isUser ? 'rgba(0, 212, 255, 0.2)' : 'rgba(155, 89, 182, 0.2)'};
            animation: messageSlide 0.3s ease;
        `;
        
        messageDiv.innerHTML = `<strong>${isUser ? '👤 You' : '🤖 AI'}:</strong> ${message}`;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    // Send message
    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        aiInput.value = '';
        
        // Show typing indicator
        setTimeout(() => {
            const response = generateAIResponse(message);
            addMessage(response);
        }, 1000);
    }
    
    // Event listeners
    aiWidget.addEventListener('click', () => {
        aiWindow.style.display = 'flex';
        aiWidget.style.display = 'none';
    });
    
    closeBtn.addEventListener('click', () => {
        aiWindow.style.display = 'none';
        aiWidget.style.display = 'block';
    });
    
    sendBtn.addEventListener('click', sendMessage);
    
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes aiPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 8px 25px rgba(155, 89, 182, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 12px 35px rgba(155, 89, 182, 0.6); }
        }
        
        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});