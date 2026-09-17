import { useEffect } from "react";
import { useStompClient, type IMessage } from "react-stomp-hooks";

export const useStompSubscribe = (
  destination: string | undefined,
  onMessage: (message: IMessage) => void,
) => {
  const client = useStompClient();
  useEffect(() => {
    if (!destination?.trim() || !client) return;
    const subscriptions = client.subscribe(destination, onMessage);

    return () => subscriptions.unsubscribe();
  }, [client, destination, onMessage]);
};
