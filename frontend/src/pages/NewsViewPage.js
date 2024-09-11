import React from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Card, Stack, Badge } from "react-bootstrap";

const NewsViewPage = () => {
  // Dummy data for the news article and related news
  const newsArticle = {
    title: "Edmunds: Five game-changing vehicles you'll want to know about",
    image: "https://via.placeholder.com/800x400",
    description:
      "If you’re thinking about buying a new car but don’t need one right away, now is a great time to show a little patience.",
    content:
      "If youre thinking about buying a new car but dont need one right away, now is a great time to show a little patience. Generally, waiting until the fall of winter can create an opportunity to purchase...",
    author: "CHASE BIERENKOVEN EDMUNDS Associated Press",
    publishDate: "2024-07-11",
    tags: ["Edmunds", "Event", "World"],
  };

  const relatedNews = [
    {
      title: "Related News 1",
      image: "https://via.placeholder.com/150x80",
    },
    {
      title: "Related News 2",
      image: "https://via.placeholder.com/150x80",
    },
    {
      title: "Related News 3",
      image: "https://via.placeholder.com/150x80",
    },
  ];

  return (
    <Layout>
      <Container className="my-5">
        <Row>
          {/* Left Side: Main News Article */}
          <Col md={8} className="mb-4">
            <h1>{newsArticle.title}</h1>
            <p className="text-muted">
              By {newsArticle.author} | {newsArticle.publishDate}
            </p>
            <img
              src={newsArticle.image}
              alt={newsArticle.title}
              className="img-fluid mb-3"
            />
            <p>{newsArticle.description}</p>
            <p>{newsArticle.content}</p>
            <div>
              <h5>Tags:</h5>
              <Stack direction="horizontal" gap={2}>
                {newsArticle.tags.map((tag, index) => (
                  <h5>
                    <Badge pill bg="primary" key={index}>
                      {tag}
                    </Badge>
                  </h5>
                ))}
              </Stack>
            </div>
          </Col>

          {/* Right Side: Related News Cards */}
          <Col md={4}>
            <h4>Related News</h4>
            {relatedNews.map((news, index) => (
              <Card className="mb-3 border-0" key={index}>
                <Card.Img
                  variant="top"
                  className="rounded-0"
                  src={news.image}
                />
                <Card.Body className="px-1">
                  <Card.Title>{news.title}</Card.Title>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default NewsViewPage;
