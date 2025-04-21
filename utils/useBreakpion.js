import { useMediaQuery } from "@mui/material";

export default function useBreakpoint() {
  const is2xl = useMediaQuery("(min-width: 1536px)");
  const isxl = useMediaQuery("(min-width: 1280px)");
  const islg = useMediaQuery("(min-width: 1024px)");
  const ismd = useMediaQuery("(min-width: 768px)");
  const issm = useMediaQuery("(min-width: 640px)");

  return { is2xl, isxl, islg, ismd, issm };
}
