import { UserFull } from "@/types";
import { Box } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

import { useRouter } from "next/navigation";

interface Props {
  client: UserFull;
}

export function ClientCard({ client }: Props) {
  const router = useRouter();
  return (
    <button
      className={`flex w-full text-xs md:text-sm xxl:text-lg p-5 rounded-lg shadow bg-white hover:bg-gray-100`}
      onClick={() => router.push(`/clients/${client._id}`)}
    >
      <Box className="w-full flex flex-col gap-3 justify-center">
        <Box className="flex items-center justify-between">
          <LaunchIcon className="text-gray-400" />
          <h5 className="text-gray-400">
            {client.surName} {client.firstName}
          </h5>
        </Box>
      </Box>
    </button>
  );
}
