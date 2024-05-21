import Slider, { Settings } from 'react-slick';
import styles from './SlickSlider.module.scss'

// Icons
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NumbersOutlined } from '@mui/icons-material';

const CLASS_PREFIX = 'custom-slider'

interface SlickSliderProps {
  children: any
  arrows: boolean
  autoplay: boolean
  autoplaySpeed: number
  dots: boolean
  infinite: boolean
  numberOfSlides: number
  slidesToShow: number
  slidesToScroll: number
  speed: number
  slide: string
}

export const SlickSlider = ({ children, ...storybookArgs }: SlickSliderProps) => {
  const PreviousArrow = ({className, onClick}: any) => {
    const disabled = className.includes('disabled') ? true : false
    return (
      <button className={`
        ${className}
        ${styles[`${CLASS_PREFIX}__arrow`]}
        ${styles[`${CLASS_PREFIX}__arrow-prev`]}
        ${disabled && styles[`${CLASS_PREFIX}__arrow-disabled`]}
      `}
        onClick={onClick}>
        <ArrowBackIosNewIcon color="primary" />
      </button>
    );
  }

  const NextArrow = ({className, onClick}: any) => {
    const disabled = className.includes('disabled') ? true : false
    return (
      <button className={`
          ${className}
          ${styles[`${CLASS_PREFIX}__arrow`]}
          ${styles[`${CLASS_PREFIX}__arrow-next`]}
          ${disabled && styles[`${CLASS_PREFIX}__arrow-disabled`]}
        `} onClick={onClick}>
        <ArrowForwardIosIcon color="primary" />
      </button>
    );
  }

  const sliderSettings: Settings = {
    arrows: storybookArgs.arrows,
    autoplay: storybookArgs.autoplay,
    autoplaySpeed: storybookArgs.autoplaySpeed || 3000,
    className: styles[`${CLASS_PREFIX}`],
    dots: storybookArgs.dots,
    infinite: storybookArgs.infinite,
    slidesToShow: storybookArgs.slidesToShow || 4,
    slidesToScroll: storybookArgs.slidesToScroll || 1,
    speed: storybookArgs.speed || 750,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    // responsive: [
    //   {
    //     breakpoint: theme.breakpoints.values.xl,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: theme.breakpoints.values.lg,
    //     settings: {
    //       slidesToShow: 4,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: theme.breakpoints.values.md,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1
    //     }
    //   },
    //   {
    //     breakpoint: theme.breakpoints.values.sm,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };

  return (
    <Slider {...sliderSettings}>
      {children}
    </Slider>
  )
}

