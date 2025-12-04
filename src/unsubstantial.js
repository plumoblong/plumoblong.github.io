async function getLatestRelease(owner = "plumoblong", repo = "unsubstantial") {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/releases/latest`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            name: data.name,
            downloadUrl: data.assets[0]?.browser_download_url || null,
            tagName: data.tag_name
        };
    } catch (error) {
        console.error('Error fetching release:', error);
        return null;
    }
}

// Usage: getLatestRelease('owner', 'repo-name')