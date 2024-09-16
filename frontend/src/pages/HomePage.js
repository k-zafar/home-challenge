import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { getnewsArticles } from '../api/newsArticles';
import { useInView } from "react-intersection-observer";
import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";

const HomePage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });


  // Fetch articles from the API
  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getnewsArticles(page);
      const { data, last_page } = response;

      setNewsArticles((prevArticles) => {
        const newArticleIds = new Set(prevArticles.map(article => article.id));
        const newArticles = [];

        for (const article of data) {
          if (!newArticleIds.has(article.id)) {
            newArticleIds.add(article.id);
            newArticles.push(article);
          }
        }

        return [...prevArticles, ...newArticles];
      });

      setHasMore(page < last_page);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreArticles = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchArticles(nextPage);
        return nextPage;
      });
    }
  }, [loading, hasMore, fetchArticles]);

  useEffect(() => {
    // Fetch articles
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Fetch more articles
    if (inView) {
      loadMoreArticles();
    }
  }, [inView, loadMoreArticles]);

  return (
    <Layout>
      <h2 className="text-center my-5">Welcome to the Home Challenge</h2>
      <Row>
        {newsArticles.length > 0 ? (
          newsArticles.map((article) => (
            <Col md={4} key={article.id} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={article.image_url ? article.image_url : "/news.png"} width={100} height={200} />
                <Card.Body>
                  <Card.Title>
                    <Link
                      to={`/news-article/${article.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {article.name}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    {article.description
                      ? article.description.length > 200
                        ? `${article.description.substring(0, 200)}...`
                        : article.description
                      : ''}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">No news articles found.</div>
        )}
      </Row>
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}
      {newsArticles.length > 0 && !hasMore && !loading && (
        <div className="text-center my-4">
          <p>No more news articles to load.</p>
        </div>
      )}
      <div ref={ref} />
    </Layout>
  );
};

export default HomePage;
