import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Modal,
  Row
} from "react-bootstrap";
import "../styles/TechWorld.css";
import moment from "moment";
import { Link } from "react-router-dom";

const TechWorld = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchRssFeeds = async () => {
      try {
        const response = await fetch("http://localhost:3004/technode/technews");
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Error fetching RSS feeds:", error);
      }
    };

    fetchRssFeeds();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="rss-wrap">
      <div className="rss-bg">
        <div className="rss">
          {/* Main RSS Feed */}
          <Container className="container" fluid>
            <div className="latest col-12 col-md-12 col-lg-9 pe-2">
              <Row xs={1} md={1} className="g-3">
                <div className="divider d-flex align-items-center my-4">
                  <h4 className="latest text-center mx-3 mb-0">
                    Latest Content
                  </h4>
                </div>
                {articles.slice(1, 6).map((item, idx) => (
                  <Col key={idx}>
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          <Card.Link
                            className="title-link"
                            onClick={() => {
                              setSelectedArticle(item);
                              setModalShow(true);
                            }}
                          >
                            {item.title}
                          </Card.Link>
                        </Card.Title>
                        <Card.Link
                          className="title-link"
                          onClick={() => {
                            setSelectedArticle(item);
                            setModalShow(true);
                          }}
                        >
                          <Card.Text className="p-3" style={{ color: "black" }}>
                            {item.content}
                          </Card.Text>
                        </Card.Link>
                        <Card.Footer>
                          <Card.Text className="author">
                            Published:{" "}
                            {moment
                              .parseZone(item.pubDate)
                              .local()
                              .format("LLLL")}
                          </Card.Text>
                          <Card.Text className="text-end">
                            <Card.Link
                              className="read-more text-secondary"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              Read more...
                            </Card.Link>
                          </Card.Text>
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
            <br />
            <div className="pop-feeds col-12 col-md-12 col-lg-3">
              <div>
                {/* Side Bar Top (Popular Feeds) */}

                <Row xs={1} md={1} className="g-3">
                  <div className="divider d-flex align-items-center my-4">
                    <h4 className="text-center mx-3 mb-0">Popular Feeds</h4>
                  </div>

                  <Col>
                    <Accordion defaultActiveKey="1" flush>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          Artificial Intelligence
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(10, 15).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header className="feed-head">
                          Coder Cheat Sheet
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(20, 25).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header className="feed-head">
                          Cloud Security
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(30, 35).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header className="feed-head">
                          Cyber Security
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(40, 45).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5">
                        <Accordion.Header className="feed-head">
                          For Developers
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(50, 55).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6">
                        <Accordion.Header className="feed-head">
                          Dev Ops
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(60, 65).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7">
                        <Accordion.Header className="feed-head">
                          Education
                        </Accordion.Header>
                        <Accordion.Body>
                          {articles.slice(70, 75).map((item, idx) => (
                            <p
                              key={idx}
                              className="accordlink"
                              onClick={() => {
                                setSelectedArticle(item);
                                setModalShow(true);
                              }}
                            >
                              {item.title}
                            </p>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <br />
                    {/* Side Bar Bottom (Top Commenters) */}
                    <Card>
                      <Card.Header>
                        <strong>Top RSS Creators</strong>
                      </Card.Header>
                      <div className="col-12">
                        <Card.Body className="commenter-list">
                          {articles.slice(4, 10).map((item, id) => (
                            <ListGroup key={id}>
                              <div className="top-com">
                                <Link to="#" className="top-com-link">
                                  <ListGroup.Item
                                    key={id}
                                    className="accordlink"
                                    onClick={() => {
                                      setSelectedArticle(item);
                                      setModalShow(true);
                                    }}
                                  >
                                    {item.creator}
                                  </ListGroup.Item>
                                </Link>
                              </div>
                            </ListGroup>
                          ))}
                        </Card.Body>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        </div>
      </div>
      {/* Modal Action */}
      <div>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={modalShow}
          onHide={() => setModalShow(false)}
        >
          <div className="modal-wrap">
            <div className="modal-case">
              <Modal.Header closeButton>
                <Modal.Title className="text-danger">
                  You are about to leave this site!
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ color: "dimgray" }}>
                  <u>Snippet:</u>
                </p>
                <Link
                  to={selectedArticle?.link}
                  className="mod-txt1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p style={{ color: "black" }}>
                    {selectedArticle?.contentSnippet}
                  </p>
                </Link>
              </Modal.Body>
              <Modal.Footer>
                <div className="mod-foot">
                  <p className="mod-txt2">
                    Author: {selectedArticle?.creator} | Published:{" "}
                    {moment
                      .parseZone(selectedArticle?.pubDate)
                      .local()
                      .format("LLLL")}{" "}
                  </p>

                  <div className="mt-4 me-4">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      href={selectedArticle?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setModalShow(false)}
                    >
                      Go To Article
                    </Button>{" "}
                  </div>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TechWorld;
