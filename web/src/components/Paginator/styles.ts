import { styled } from '../../styles/index'

export const Main = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  width: 'auto',

  button: {
      height: '100%',
      minWidth: '2rem',
      borderRadius: 0,

      '&:disabled': {
          svg: {
              opacity: 0.5,
          },
      },
  },

  '.paginationButtons': {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: '0.25rem',
      overflow: 'hidden',
      minHeight: '2.5rem',
      maxHeight: '4rem',
      maxWidth: '600px',

      '.pagesContainer': {
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          height: '100%',
      },

      '.pageSelected': {
          background: '$green_600',
          color: '$white_800'
      },
  },
})