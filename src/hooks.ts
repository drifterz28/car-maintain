import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { domain, auth0Params } from "./constants";
import { useQuery } from "@tanstack/react-query";

export const useSaveUserMetadata = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const raw = JSON.stringify({
        user_metadata: userMetadata,
      });

      try {
        const accessToken = await getAccessTokenSilently();
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        await fetch(userDetailsByIdUrl, {
          method: "PATCH",
          body: raw,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      } catch (e: unknown) {
        // @ts-expect-error event unknown
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub, user?.name, userMetadata]);

  return [userMetadata, setUserMetadata];
};

export const useUserMetadata = () => {
  const {user, getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ['USER_META_DATA', user?.sub],
    queryFn: async () => {
      try {
        const accessToken = await getAccessTokenSilently(auth0Params);
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await metadataResponse.json();

        return data;
      } catch (e) {
        // @ts-expect-error event unknown
        console.log(e.message);
      }
    },
  })
};
