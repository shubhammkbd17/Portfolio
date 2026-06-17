// Real GitHub Stats for shubhammkbd17
document.addEventListener('DOMContentLoaded', function() {
    const username = 'shubhammkbd17';
    
    async function fetchGitHubStats() {
        try {
            console.log('Fetching real GitHub stats for:', username);
            
            // Fetch user data
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error('User data fetch failed');
            const userData = await userResponse.json();
            
            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
            if (!reposResponse.ok) throw new Error('Repos data fetch failed');
            const reposData = await reposResponse.json();
            
            // Calculate stats
            const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
            
            // Update counters with animation
            animateCounter('repos-count', userData.public_repos);
            animateCounter('followers-count', userData.followers);
            animateCounter('stars-count', totalStars);
            animateCounter('forks-count', totalForks);
            
            // Update languages
            displayLanguages(reposData);
            
            // Update recent repos
            displayRecentRepos(reposData);
            
            console.log('GitHub stats loaded successfully!');
            
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            showFallbackStats();
        }
    }
    
    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let currentValue = 0;
        const increment = Math.ceil(targetValue / 50);
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            element.textContent = currentValue;
        }, 30);
    }
    
    function displayLanguages(repos) {
        const languages = {};
        
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        const sortedLanguages = Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
        
        const total = sortedLanguages.reduce((sum, [,count]) => sum + count, 0);
        
        const langIcons = {
            'JavaScript': '<i class="fab fa-js" style="color: #F7DF1E; font-size: 3rem;" title="JavaScript"></i>',
            'TypeScript': '<span style="color: #3178C6; font-size: 2.5rem; font-weight: bold; font-family: monospace;" title="TypeScript">TS</span>',
            'Python': '<i class="fab fa-python" style="color: #3776AB; font-size: 3rem;" title="Python"></i>',
            'HTML': '<i class="fab fa-html5" style="color: #E34F26; font-size: 3rem;" title="HTML"></i>',
            'CSS': '<i class="fab fa-css3-alt" style="color: #1572B6; font-size: 3rem;" title="CSS"></i>',
            'Java': '<i class="fab fa-java" style="color: #ED8B00; font-size: 3rem;" title="Java"></i>',
            'C++': '<i class="fas fa-file-code" style="color: #00599C; font-size: 3rem;" title="C++"></i>',
            'C': '<i class="fas fa-file-code" style="color: #555555; font-size: 3rem;" title="C"></i>',
            'Dockerfile': '<i class="fab fa-docker" style="color: #2496ED; font-size: 3rem;" title="Dockerfile"></i>'
        };

        const languagesList = document.getElementById('languages-list');
        if (languagesList) {
            languagesList.innerHTML = `
                <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; flex-wrap: wrap; padding: 2rem 0;">
                    ${sortedLanguages.map(([lang]) => langIcons[lang] || `<span style="font-size: 1.2rem; padding: 0.5rem 1rem; background: rgba(255,255,255,0.1); border-radius: 20px;">${lang}</span>`).join('')}
                </div>
            `;
        }
    }
    
    function displayRecentRepos(repos) {
        const recentRepos = document.getElementById('recent-repos');
        if (!recentRepos) return;
        
        const sortedRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 4);
        
        recentRepos.innerHTML = sortedRepos.map(repo => `
            <div class="repo-item">
                <div class="repo-name">${repo.name}</div>
                <div class="repo-desc">${repo.description || 'No description available'}</div>
                <div class="repo-lang">${repo.language || 'Unknown'}</div>
            </div>
        `).join('');
    }
    
    function showFallbackStats() {
        // Show actual profile data when API fails due to rate limiting
        animateCounter('repos-count', 14);
        animateCounter('stars-count', 0);
        animateCounter('forks-count', 0);
        animateCounter('followers-count', 0);
        
        document.getElementById('languages-list').innerHTML = `
            <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; flex-wrap: wrap; padding: 2rem 0;">
                <i class="fab fa-js" style="color: #F7DF1E; font-size: 3rem;" title="JavaScript"></i>
                <span style="color: #3178C6; font-size: 2.5rem; font-weight: bold; font-family: monospace;" title="TypeScript">TS</span>
                <i class="fab fa-docker" style="color: #2496ED; font-size: 3rem;" title="Dockerfile"></i>
                <i class="fab fa-html5" style="color: #E34F26; font-size: 3rem;" title="HTML"></i>
            </div>
        `;
        
        const recentRepos = document.getElementById('recent-repos');
        if (recentRepos) {
            recentRepos.innerHTML = `
                <div class="repo-item">
                    <div class="repo-name">Vgram1</div>
                    <div class="repo-desc">No description available</div>
                    <div class="repo-lang">TypeScript</div>
                </div>
                <div class="repo-item">
                    <div class="repo-name">taskflow</div>
                    <div class="repo-desc">No description available</div>
                    <div class="repo-lang">JavaScript</div>
                </div>
                <div class="repo-item">
                    <div class="repo-name">shubhammkbd17</div>
                    <div class="repo-desc">Hello World! This is my profile</div>
                    <div class="repo-lang">Unknown</div>
                </div>
            `;
        }
    }
    
    // Setup refresh button
    const refreshBtn = document.getElementById('refresh-github');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.querySelector('i').style.transform = 'rotate(360deg)';
            fetchGitHubStats();
            setTimeout(() => {
                refreshBtn.querySelector('i').style.transform = '';
            }, 1000);
        });
    }
    
    // Load stats on page load
    setTimeout(fetchGitHubStats, 1000);
});