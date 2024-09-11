import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";

const NewsListingPage = () => {
  // Dummy data for news articles
  const newsArticles = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1, // Add a unique identifier for each article
    title: `Edmunds: Five game-changing vehicles you'll want to know about ${
      index + 1
    }`,
    image: `https://via.placeholder.com/150x100?text=Image+${index + 1}`,
    description: `If you’re thinking about buying a new car ${
      index + 1
    } but don’t need one right away, now is a great time to show a little patience.`,
  }));

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // Calculate the indices for slicing the newsArticles array
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Create pagination items
  const pageCount = Math.ceil(newsArticles.length / articlesPerPage);
  const paginationItems = [];
  for (let i = 1; i <= pageCount; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Layout>
      <Container className="my-5">
        <h1 className="text-center my-5">News Articles</h1>
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
        <Pagination className="justify-content-center mt-4">
          {paginationItems}
        </Pagination>
      </Container>
    </Layout>
  );
};

export default NewsListingPage;
