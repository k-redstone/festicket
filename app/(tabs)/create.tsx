import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function CreateScreen() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tickets/create/CreateTicketFunnel");
  }, []);

  return null;
}
