import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type ThemeConfig = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

export type ImageBusiness = {
    image: string;
  };

  export type ProgressBar = {
    color: string;
    percent: number;
  };

  export type AdminAvatar = {
    data: {
      userName: string;
      avatarImg: string;
    }[];
  };


/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
  themeColor: 'purple',
  direction: THEME_ENUM.DIR_LTR,
  mode: THEME_ENUM.MODE_DARK,
  primaryColorLevel: 800,
  cardBordered: true,
  panelExpand: false,
  controlSize: 'md',
  navMode: THEME_ENUM.NAV_MODE_DARK,
  layout: {
      type: THEME_ENUM.LAYOUT_TYPE_STACKED_SIDE,
      sideNavCollapse: false,
  },
}
