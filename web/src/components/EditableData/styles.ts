import { styled } from "../../styles";

export const Tr = styled('tr', {
  backgroundColor: '$white_300',
  borderBottom: 'solid 2px $black_150',
  transition: '0.15s',
  cursor: 'pointer',

  td: {
    padding: '0.5rem',
    whiteSpace: 'nowrap'
  },

  '&:hover': {
    backgroundColor: '$white_500',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
  },

  '&:active': {
    backgroundColor: '$white_300',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)'
  }
})