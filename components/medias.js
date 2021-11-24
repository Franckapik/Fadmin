import { useRouter } from "next/router";

export const Medias = ({ mediasFiles, setShow, show }) => {
  const router = useRouter();

  const addQuery = (key, value) => {
    setShow(!show);
    router.query[key] = value;
    router.push(router);
  };

  return (
    <ul>
      {mediasFiles && mediasFiles != 0
        ? mediasFiles.map((a, i) => {
            const path_client_img = a.folder_path.substr(7) + "/" + a.files[0];
            return (
              <li key={i}>
                <a onClick={() => addQuery("media", a.media_id)}>
                  {a.media_title}{" "}
                  <img
                    src={path_client_img}
                    alt="..."
                    width="500"
                    height="200"
                  />
                </a>
              </li>
            );
          })
        : null}{" "}
    </ul>
  );
};
