declare module '*.css' {
  const styles: Record<string, string>;
  export default styles;
}
declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}
declare module '*.png' {
  const url: string;
  export default url;
}
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
