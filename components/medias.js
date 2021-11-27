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
        ? mediasFiles.map((a, i) => {
            const path_client_img = a.folder_path.substr(7) + "/" + a.files[0];
            return (
              <Card
                border="0"
                className="m-2 cursor"
                style={{
                  width: 350,
                  height: 280,
                  backgroundImage: `url(${
                    a.folder_path.substr(7) + "/" + a.files[0]
                  })`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
                onClick={() => addQuery("media", a.media_id)}
                key={i}
              ></Card>
            );
          })
        : null}{" "}
    </Container>
  );
};
