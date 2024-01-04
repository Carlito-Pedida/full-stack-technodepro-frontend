import React, { useEffect, useState } from "react";

const TechWorldArticle = ({ url }) => {
  const [article, setArticle] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [url]);

  return (
    <div className="mt-5">
      <h3>New Site Feature Coming Soon!</h3>
    </div>
  );
};

export default TechWorldArticle;
