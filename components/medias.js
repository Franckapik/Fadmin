import { useRouter } from "next/router";
import { Card, Container, Figure } from "react-bootstrap";

export const Medias = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();

  const addQuery = (key, value) => {
    setShow(!show);
    router.query[key] = value;
    router.push(router);
  };

  console.log(mediasFiles);
  return (
    <Container fluid className="d-flex justify-content-center flex-wrap ">
      {" "}
      {/*justify-content-between */}
      {mediasFiles && mediasFiles != 0
        ? mediasFiles
            .sort((a, b) => a.media_position - b.media_position)
            .map((a, i) => {
              return (
                <>
                  <Card
                    border="0"
                    className="cursor mx-auto mb-3"
                    onClick={() => addQuery("media", a.media_id)}
                    key={i}
                  >
                    <Card.Body
                      style={{
                        margin: "auto",
                        width: a.media_large ? "33vw" : "25vw",
                        height: "20vw",
                        backgroundImage: `url(${
                          a.folder_path.substr(7) + "/" + a.files[0]
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                      }}
                    ></Card.Body>
                    <Card.Footer>
                      <h6>{a.media_title || a.category.category_name}</h6>
                      <h7>{a.media_subtitle}</h7>
                    </Card.Footer>
                  </Card>
                </>
              );
            })
        : null}{" "}
    </Container>
  );
};
