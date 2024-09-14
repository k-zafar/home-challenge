import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getNewsArticle } from "../api/newsArticles";
import { Container, Row, Col } from "react-bootstrap";

const NewsViewPage = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams();

  // Fetch article from the API
  const fetchArticle = async (id) => {
    try {
      const response = await getNewsArticle(id);
      setArticle(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchArticle(id);
  }, []);

  return (
    <Layout>
      <Container className="my-5">
        <Row>
          {article.id && (
            <Col md={12} className="mb-4">
              <h1>{article.name}</h1>
              <p className="text-muted">
                {article.author && `By ${article.author.name} | `}{" "}
                {article.publish_date}
              </p>
              <img
                src={article.image_url ? article.image_url : "/news.png"}
                alt={article.name}
                className="img-fluid mb-3 w-100"
              />
              <h5>{article.description}</h5>
              <p>{article.content}</p>
            </Col>
          )}
        </Row>
      </Container>
    </Layout>
  );
};

export default NewsViewPage;
