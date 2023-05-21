import { styled } from "../../styles";

export const ModalContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',

  a: {
    textDecoration: 'none',
  },

  button: {
    width: '100%',
  },

  '.checkboxContainer': {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.25rem'
  },

  '.exportContainer': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: '17.37500rem',
  },

  '.filterContainer': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    maxWidth: '20rem',

    '.filterFieldContainer': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '0.25rem',
      width: '100%',

      input: {
        width: '100%',
      }
    }
  },

  '.fieldsContainer': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  '.selectPageContainer': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    select: {
      width: '100%',
      textAlign: 'left',
    }
  },

  '.operator': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    gap: '0.5rem',
    border: 0,
    borderRadius: '0.25rem',
    outline: 0,
    backgroundColor: 'transparent',
    fontSize: '1rem',
    padding: '0.375rem',
    appearance: 'none',
    textAlign: 'center',
    width: 'min-content',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)'
    },

    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    gap: '0.5rem',
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
    textDecoration: 'none',

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