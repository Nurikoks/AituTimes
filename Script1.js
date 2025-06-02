var data = {
    articles: [
        {
            id: 1,
            title: "New Study Reveals Surprising Health Benefits of Coffee",
            date: "2024-10-15",
            category: "Health",
            content: "A new study published this week has found that drinking coffee may have numerous health benefits...",
            views: 150,
            wordCount: 500,
            image: "images/1article.jpg"
        },
        {
            id: 2,
            title: "Tech Giants Announce Collaboration on AI Safety Standards",
            date: "2024-11-01",
            category: "Technology",
            content: "In a groundbreaking move, several major tech companies have come together to develop common standards for artificial intelligence safety...",
            views: 300,
            wordCount: 650,
            image: "images/2article.jpg"
        },
        {
            id: 3,
            title: "Local Art Fair Brings Creativity to the Community",
            date: "2024-09-22",
            category: "Arts",
            content: "This year’s local art fair saw a record attendance as artists and creators gathered to display their works...",
            views: 85,
            wordCount: 400,
            image: "images/3article.jpg"
        },
        {
            id: 4,
            title: "Experts Predict Economic Trends for 2025",
            date: "2024-10-05",
            category: "Finance",
            content: "With 2025 on the horizon, financial experts have released their predictions for economic trends that may shape the upcoming year...",
            views: 220,
            wordCount: 700,
            image: "images/4article.jpg"
        },
        {
            id: 5,
            title: "Climate Change and the Future of Renewable Energy",
            date: "2024-11-02",
            category: "Environment",
            content: "As climate change continues to be a pressing global issue, renewable energy sources are becoming increasingly important...",
            views: 400,
            wordCount: 800,
            image: "images/5article.jpg"
        },
        {
            id: 6,
            title: "Breakthroughs in Cancer Research Offer New Hope",
            date: "2024-08-30",
            category: "Health",
            content: "Recent breakthroughs in cancer research have led to promising new treatments that may improve survival rates...",
            views: 130,
            wordCount: 550,
            image: "images/6article.jpg"
        },
        {
            id: 7,
            title: "Guide to Traveling on a Budget in 2025",
            date: "2024-10-20",
            category: "Travel",
            content: "With travel becoming more accessible post-pandemic, many people are looking for ways to explore the world on a budget...",
            views: 90,
            wordCount: 450,
            image: "images/7article.jpg"
        },
        {
            id: 8,
            title: "The Rise of Electric Vehicles in the Automotive Industry",
            date: "2024-09-15",
            category: "Automotive",
            content: "Electric vehicles are gaining popularity worldwide as consumers seek eco-friendly alternatives...",
            views: 250,
            wordCount: 600,
            image: "images/8article.jpg"
        },
        {
            id: 9,
            title: "How Meditation Can Improve Mental Health",
            date: "2024-11-04",
            category: "Health",
            content: "In a fast-paced world, meditation is increasingly recognized as a powerful tool for managing stress...",
            views: 175,
            wordCount: 500,
            image: "images/9article.jpg"
        },
        {
            id: 10,
            title: "The Impact of Social Media on Modern Relationships",
            date: "2024-10-12",
            category: "Society",
            content: "Social media has changed the way people connect, but what impact does it have on relationships?",
            views: 205,
            wordCount: 550,
            image: "images/10article.jpg"
        }
    ]
};

var readingSpeed = 200; // слов в минуту

var articlesContainer = document.getElementById("articlesContainer");
var popularArticleDiv = document.getElementById("popularArticle");
var sortSelect = document.getElementById("sortSelect");
var themeToggleBtn = document.getElementById("themeToggle");
var articleSearchInput = document.getElementById("articleSearch");

var filteredArticles = data.articles.slice();

function loadTheme() {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === null) {
        savedTheme = "light";
    }
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateButtonIcon(savedTheme);
}

function updateButtonIcon(theme) {
    if (theme === "light") {
        themeToggleBtn.textContent = "☀️";
    } else {
        themeToggleBtn.textContent = "🌙";
    }
}

function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var newTheme;
    if (currentTheme === "light") {
        newTheme = "dark";
    } else {
        newTheme = "light";
    }
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonIcon(newTheme);
}

themeToggleBtn.addEventListener("click", toggleTheme);

function calcReadingTime(words) {
    return Math.ceil(words / readingSpeed);
}

function filterArticlesBySearch(searchText) {
    if (!searchText) {
        filteredArticles = data.articles.slice();
    } else {
        var lowerSearch = searchText.toLowerCase();
        filteredArticles = [];
        for (var i = 0; i < data.articles.length; i++) {
            var article = data.articles[i];
            if (article.title.toLowerCase().indexOf(lowerSearch) === 0) {
                filteredArticles.push(article);
            }
        }
    }
    sortAndRender();
}

function sortAndRender() {
    var criteria = sortSelect.value;
    if (criteria === "date") {
        filteredArticles.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    } else if (criteria === "views") {
        filteredArticles.sort(function (a, b) {
            return b.views - a.views;
        });
    }
    renderArticles(filteredArticles);
    updatePopularArticle(filteredArticles);
}

articleSearchInput.addEventListener("input", function (e) {
    filterArticlesBySearch(e.target.value);
});

sortSelect.addEventListener("change", function () {
    sortAndRender();
});

function renderArticles(articles) {
    articlesContainer.innerHTML = "";
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        var readTime = calcReadingTime(article.wordCount);

        var articleCard = document.createElement("article");
        articleCard.id = "article-" + article.id;
        articleCard.className = "card mb-3 p-3";
        articleCard.innerHTML =
            '<img src="' + article.image + '" alt="' + article.title + '" class="article-image mb-2">' +
            '<h3>' + article.title + '</h3>' +
            '<div class="text-muted">' + article.date + " • " + article.category + " • " + article.views + ' views</div>' +
            '<p>' + article.content + '</p>';

        (function (articleCopy) {
            articleCard.addEventListener("click", function () {
                articleCopy.views++;
                updatePopularArticle(filteredArticles);
                sortAndRender();
            });
        })(article);

        articlesContainer.appendChild(articleCard);
    }
}

function updatePopularArticle(articles) {
    if (articles.length === 0) {
        popularArticleDiv.innerHTML = "<p>No articles found.</p>";
        return;
    }
    var popular = articles[0];
    for (var i = 1; i < articles.length; i++) {
        if (articles[i].views > popular.views) {
            popular = articles[i];
        }
    }
    popularArticleDiv.innerHTML =
        '<h6>' + popular.title + '</h6>' +
        '<p><small>Views: ' + popular.views + ' | Estimated Reading Time: ' + calcReadingTime(popular.wordCount) + ' min</small></p>';
}

// Инициализация
loadTheme();
filteredArticles = data.articles.slice();
sortAndRender();
