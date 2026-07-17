import { usePathname, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
    children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const loggedIn = useSelector((state: any) => state.user.loggedIn);

    useEffect(() => {
        if (!loggedIn && pathname !== "/auth") {
            router.replace("/auth");
        }
    }, [loggedIn, pathname]);

    return <>{children}</>;
}
