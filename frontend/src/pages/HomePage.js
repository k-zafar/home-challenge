import React, { useState, useCallback, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  // Dummy data for news articles
  const allNewsArticles = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Edmunds: Five game-changing vehicles you'll want to know about ${
      index + 1
    }`,
    image: `https://via.placeholder.com/150x100?text=Image+${index + 1}`,
    description: `If you’re thinking about buying a new car ${
      index + 1
    } but don’t need one right away, now is a great time to show a little patience.`,
  }));

  // Pagination state
  const [visibleArticles, setVisibleArticles] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Intersection Observer hook
  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  // Load more articles when user scrolls to the bottom
  const loadMoreArticles = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    // Simulate an API call with a timeout
    setTimeout(() => {
      setVisibleArticles((prev) => {
        const newVisibleArticles = prev + 10;
        if (newVisibleArticles >= allNewsArticles.length) {
          setHasMore(false); // No more articles to load
        }
        return Math.min(newVisibleArticles, allNewsArticles.length);
      });
      setLoading(false);
    }, 1000);
  }, [loading, hasMore]);

  // Trigger load more news articals
  useEffect(() => {
    if (inView) {
      loadMoreArticles();
    }
  }, [inView, loadMoreArticles]);

  const currentArticles = allNewsArticles.slice(0, visibleArticles);

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h2 className="text-center my-5">Welcome to the Home Challenge</h2>
        <Row>
          {currentArticles.map((article) => (
            <Col md={4} key={article.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={article.image} />
                <Card.Body>
                  <Card.Title>
                    <Link
                      to={`/news/${article.id}`}
                      className="text-decoration-none text-dark"
                    >
                      {article.title}
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    {article.description.length > 30
                      ? `${article.description.substring(0, 30)}...`
                      : article.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {hasMore && (
          <div ref={ref} className="text-center my-4">
            {loading && <Spinner animation="border" />}
          </div>
        )}
        {!hasMore && (
          <div className="text-center my-4">
            <p>No more news articles to load.</p>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
