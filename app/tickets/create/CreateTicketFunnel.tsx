import { useFunnel } from "@use-funnel/react-navigation-native";

import SelectImageScreen from "@/components/ticket/createScreen/SelectImageScreen";
import EditImageScreen from "@/components/ticket/createScreen/EditImageScreen";
import TicketInfoScreen from "@/components/ticket/createScreen/TicketInfoScreen";
import type { TCreateTicketFunnelSteps } from "@/types/createTicketContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateTicketFunnel() {
  const funnel = useFunnel<TCreateTicketFunnelSteps>({
    id: "ticket-funnel",
    initial: { step: "SelectImage", context: {} },
  });

  return (
    <SafeAreaView className="flex-1">
      <funnel.Render
        SelectImage={({ context, history }) => (
          <SelectImageScreen
            onNext={(originImage) =>
              history.push("EditImage", { ...context, originImage })
            }
          />
        )}
        EditImage={({ context, history }) => (
          <EditImageScreen
            context={context}
            onNext={(editImage) =>
              history.push("TicketInfo", { ...context, editImage })
            }
            onBack={() => history.push("SelectImage")}
          />
        )}
        TicketInfo={({ context, history }) => (
          <TicketInfoScreen
            context={context}
            onBack={() => history.push("EditImage")}
          />
        )}
      />
    </SafeAreaView>
  );
}
