import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    accentColor: string;
    cardBgColor: string;
    cardBgColorLight: string;
    reverseTextColor: string;
  }
}
