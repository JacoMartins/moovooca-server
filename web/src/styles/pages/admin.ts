import { styled } from '../'

export const Main = styled('main', {
    position: 'relative',
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
});

export const BodyContainer = styled('div', {
    display: 'grid',
    maxHeight: '100vh',
    width: '100%',

    '@media screen and (min-width: 768px)': {
        gridTemplateColumns: '20% 1fr',
    },

    '.sidebar': {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '$white_80',
        // backgroundColor: '#000',
        width: 'auto',
        maxHeight: 'calc(100vh - 4rem)',
        padding: '1.5rem',

        '.headerContainer': {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'center',
            justifyContainer: 'center',

            h4: {
                fontWeight: 500,
                fontSize: '1rem',
                color: '$black_800',
            }
        },

        '.listContainer': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            gap: '0.5rem',
        }
    },

    '.content': {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 4rem)',
        padding: '2rem 2rem',
        overflow: 'auto',
        background: 'rgba(47, 133, 90, 0.08)',

        table: {
            width: '100%'
        },

        '.searchContainer': {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'center',
            borderRadius: '0.375rem',
            background: '$white_800',
            border: 'solid 1px $black_150',
            outline: 'solid 2px transparent',
            transition: 'all 0.2s ease-in-out',
            padding: '0.125rem',

            '&:focus-within': {
                border: 'solid 1px $green_400',
                outline: 'solid 2px rgba(56, 161, 105, 0.3)',
            },

            input: {
                width: '100%',
                maxHeight: '100%',
                background: 0,
                padding: '0.5rem',
                border: 0,
                outline: 0,
            },

            button: {
                borderRadius: '0.25rem',
            }
        },

    }
});

export const ListButton = styled('button', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    gap: '0.5rem',
    textAlign: 'left',
    background: 'transparent',
    color: '$green_700',
    border: 'none',
    padding: '0.75rem 0.75rem',
    transition: '0.15s',
    userSelect: 'none',

    '&:hover': {
        backgroundColor: 'rgba(47, 133, 90, 0.1)',
        border: 0,
    },

    '&:active': {
        backgroundColor: 'rgba(47, 133, 90, 0.2)',
        border: 0,
    },

    variants: {
        isActive: {
            true: {
                fontWeight: 600,
                backgroundColor: 'rgba(47, 133, 90, 0.15)'
            },
            false: {
                fontWeight: 400
            }
        }
    }
})

export const AdminSubMain = styled('main', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%',
    height: '100%',

    '.addButton': {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$green_500',
        color: '$black_800',
        border: 'solid 1px $black_50',
        borderRadius: '5rem',
        padding: '0.5rem 0.5rem',
        fontSize: '1rem',
        fontWeight: 400,
        cursor: 'pointer',
        outline: 0,

        bottom: '1rem',
        right: '1rem',

        '&:hover': {
            transition: 'all 0.15s ease-in-out',
            backgroundColor: '$green_600',
        },

        '&:active': {
            border: 'solid 1px $black_150',
            filter: 'brightness(0.95)',
            transition: 'all 0.15s ease-in-out',
        }
    },

    '.paginationContainer': {
        display: 'flex',
        flexDirection: 'row',

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
    },

    '.lineSection': {
        maxWidth: '100%',
        height: '100%',
        overflow: 'auto',

        table: {
            th: {
                borderRight: 'solid 2px $black_150'
            }
        }
    }
})

export const ModalContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',

    button: {
        width: '100%',
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