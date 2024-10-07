import { rpc } from "@/lib/rpc";
import { handleEden } from "@/utils/base";
import { useMutation } from "@tanstack/react-query";

export const AuthHook = () => {
  const registerMutation = useMutation({
    mutationFn: async (
      ...args: Parameters<typeof rpc.api.auth.register.post>
    ) => handleEden(await rpc.api.auth.register.post(...args)),
  });

  const loginMutation = useMutation({
    mutationFn: async (...args: Parameters<typeof rpc.api.auth.login.post>) =>
      handleEden(await rpc.api.auth.login.post(...args)),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => handleEden(await rpc.api.auth.logout.get()),
  });

  return {
    registerMutation,
    loginMutation,
    logoutMutation,
  };
};
