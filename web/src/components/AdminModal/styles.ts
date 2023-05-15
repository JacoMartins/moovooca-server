import { styled } from "../../styles";

export const ModalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',

  button: {
      width: '100%',
  },

  '.menuList': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    
    '@media screen and (min-width: 768px)': {
      minWidth: '19rem',
    },

    button: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      gap: '0.5rem',
      border: 0,
      backgroundColor: 'transparent',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)'
      },
  
      '&:active': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
      },
    }
  },

  '.redirectButton': {
    width: 'auto',
    height: 'auto',
    padding: '0.25rem',
    background: 'transparent',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },

    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
  },

  '.sendButton': {
      backgroundColor: '$green_600',
      color: 'white',

      '&:hover': {
          filter: 'brightness(0.95)'
      }
  },

  '.editInput': {
      backgroundColor: 'transparent',
      border: 0,
      outline: 0,
      padding: '0.25rem',
      width: '100%',

      '&:hover': {
          backgroundColor: 'rgba(154, 230, 180, 0.5)'
      },

      '&:focus': {
          outline: 0,
          border: 0,
          backgroundColor: '$green_200'
      }
  },

  '.row': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem'
  }
})