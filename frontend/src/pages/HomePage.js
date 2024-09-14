import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { DateRangePicker } from 'react-date-range';
import { getnewsArticles } from '../api/newsArticles';
import { useInView } from "react-intersection-observer";
import { getCategories, getSources } from "../api/preferences";
import React, { useState, useCallback, useEffect } from "react";
import { Form, Row, Col, Card, Spinner, Button } from "react-bootstrap";

const HomePage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    threshold: 1.0,
    triggerOnce: false,
  });

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  // Fetch articles from the API
  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getnewsArticles(page, {
        search,
        startDate,
        endDate,
        source: selectedSource,
        category: selectedCategory
      });
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

  const fetchData = async () => {
    setLoading(true);

    try {
      const [categoriesData, sourcesData] = await Promise.all([
        getCategories(),
        getSources()
      ]);

      setCategories(categoriesData);
      setSources(sourcesData);

    } catch (error) {
      setError('Failed to fetch categories or sources');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch articles
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Fetch categories and sources data
    fetchData();
  }, []);
  
  useEffect(() => {
    // Fetch more articles
    if (inView) {
      loadMoreArticles();
    }
  }, [inView, loadMoreArticles]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setNewsArticles([]);
    setCurrentPage(1);
    fetchArticles(1);
  };

  const handleSelect= (ranges) =>{
    const { selection } = ranges;
    setSelectionRange(selection);
    setEndDate(selection.endDate.toISOString().split('T')[0]);
    setStartDate(selection.startDate.toISOString().split('T')[0]);
  }
  return (
    <Layout>
      <h2 className="text-center my-5">Welcome to the Home Challenge</h2>
      <Row>
        <Form onSubmit={handleSubmit} className="mb-4">
          <Row>
            <Col md={12}>
              <Form.Group controlId="search">
                <Form.Label>Search</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Search..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="source">
                <Form.Label>Source</Form.Label>
                <Form.Control 
                  as="select" 
                  value={selectedSource} 
                  onChange={(e) => setSelectedSource(e.target.value)}
                >
                  <option value="">Select Source</option>
                  {sources.map((source) => (
                    <option key={source.id} value={source.id}>{source.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control 
                  as="select" 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={12} >
              <Form.Group controlId="dateRange" as={Row}>
                <Form.Label>Date Range</Form.Label>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                />
              </Form.Group>
            </Col>

            <Col md={12} className="text-center">
              <Button type="submit" variant="primary" className="w-25 my-4 text-center">Search</Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row>
        {newsArticles.length > 0 ? (
          newsArticles.map((article) => (
            <Col md={4} key={article.id} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={article.image_url ? article.image_url : "/news.png"} width={100} height={200} />
                <Card.Body>
                  <Card.Title>
                    <Link
                      to={`/news/${article.id}`}
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
                  <Card.Text>
                    {article.publish_date
                      ? article.publish_date 
                      : ""
                      }
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
