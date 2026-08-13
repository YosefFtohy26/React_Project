import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import NewsCard from "../components/cards/NewsCard";
import { SearchBar } from "../components/common/SearchBar";
import newsData from "../data/news_data.json";

const CAROUSEL_SIZE = 5;
const ITEMS_PER_PAGE = 9;

export default function News() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  // Extract unique categories and filter news data
  const { heroNews, allNews, categories } = useMemo(() => {
    const newsWithImages = newsData.filter(
      (news) => news.images && news.images.length > 0,
    );

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(newsWithImages.map((news) => news.category[i18n.language])),
    ];

    return {
      allNews: newsWithImages,
      heroNews: newsWithImages.slice(0, CAROUSEL_SIZE),
      categories: uniqueCategories,
    };
  }, [i18n.language]);

  // Filter news based on category and search query
  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allNews.filter((news) => {
      const matchesCategory =
        selectedCategory === "all" ||
        news.category[i18n.language] === selectedCategory;
      const matchesSearch =
        !query ||
        news.title[i18n.language].toLowerCase().includes(query) ||
        news.body[i18n.language].toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, allNews, search, i18n.language]);

  // Reset pagination when filters change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // Auto-rotate carousel independently
  useEffect(() => {
    if (heroNews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroNews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroNews.length]);

  // Calculate pagination based on filtered news
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  // Ensure current page doesn't exceed total pages (handles category changes)
  const validPage = Math.min(currentPage, Math.max(1, totalPages));

  const paginatedNews = filteredNews.slice(
    (validPage - 1) * ITEMS_PER_PAGE,
    validPage * ITEMS_PER_PAGE,
  );

  // Extract date from URL (format: yyyy-mm-dd)
  const extractDate = (url) => {
    const dateMatch = url.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      return new Date(`${year}-${month}-${day}`).toLocaleDateString(
        i18n.language === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "long", day: "numeric" },
      );
    }
    return t("news.unknown_date");
  };

  const currentNews = heroNews[currentSlide];

  return (
    <div>
      {/* Hero Section with Carousel */}
      {heroNews.length > 0 && currentNews && (
        <div className="hero-news-wrapper">
          <div className="hero-news-section container mt-4">
            <div className="hero-news-image-container">
              <img
                src={currentNews.images[0]}
                alt={currentNews.title[i18n.language]}
                className="hero-news-image"
              />
              <div className="hero-news-overlay"></div>
            </div>

            <div className="hero-news-content">
              <div className="hero-news-badge">
                {currentNews.category[i18n.language]}
              </div>
              <h1 className="hero-news-title">
                {currentNews.title[i18n.language]}
              </h1>
              <p className="hero-news-excerpt">
                {currentNews.body[i18n.language]}
              </p>

              <div className="hero-news-meta">
                <span className="hero-news-date">
                  {extractDate(currentNews.url)}
                </span>
              </div>

              <button
                onClick={() => navigate(`/news/${currentNews.id}`)}
                className="btn-read-more"
              >
                {t("news.read_more")}
              </button>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="hero-news-indicators">
            {heroNews.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={t("news.go_to_slide", { n: index + 1 })}
              />
            ))}
          </div>
        </div>
      )}

      {/* News Grid */}
      <section className="news-page-section">
        <div className="container mx-auto px-4">
          <div className="news-page-header">
            <h2 className="news-page-title">{t("nav.news")}</h2>
            <div className="accent-line"></div>

            {/* Search */}
            <div className="news-search-wrap mx-auto">
              <SearchBar
                value={search}
                onChange={handleSearchChange}
                placeholder={t("news.search_placeholder")}
              />
            </div>

            {/* Category Filter */}
            <div className="news-filter-tags">
              <button
                className={`news-filter-tag ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => handleCategoryChange("all")}
              >
                {t("news.all_categories")}
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`news-filter-tag ${
                    selectedCategory === category ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category[i18n.language] || category}
                </button>
              ))}
            </div>
          </div>

          <div className="news-grid">
            {paginatedNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="news-pagination">
              <span className="pagination-info">
                {t("news.page")} {validPage} {t("news.of")} {totalPages}
              </span>
              <nav className="pagination-controls">
                {validPage > 1 && (
                  <button
                    onClick={() => setCurrentPage(validPage - 1)}
                    className="pagination-btn"
                  >
                    ←
                  </button>
                )}

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (validPage <= 3) {
                    pageNum = i + 1;
                  } else if (validPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = validPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`pagination-btn ${validPage === pageNum ? "active" : ""}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && validPage < totalPages - 2 && (
                  <>
                    <span className="pagination-ellipsis">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="pagination-btn"
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {validPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(validPage + 1)}
                    className="pagination-btn pagination-next"
                  >
                    {t("news.next")} <ChevronRight size={16} />
                  </button>
                )}
              </nav>
            </div>
          )}

          {filteredNews.length === 0 && (
            <div className="text-center text-muted py-5">
              {t("news.no_news")}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
