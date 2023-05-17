import { keyframes } from '@stitches/react';
import { styled } from '../'

export const slideRightAndFade = keyframes({
    from: {
        opacity: 0,
        transform: 'translateX(calc(-2rem))',
    },
    to: {
        opacity: 1,
        transform: 'translateX(calc(-0rem))',
    },
});

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
    gridTemplateColumns: '20% 1fr',
    maxHeight: '100%',
    width: '100%',

    '@media screen and (max-width: 768px)': {
        gridTemplateColumns: 'none',
    },

    '.content': {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 4rem)',
        padding: '2rem 2rem',
        overflow: 'auto',
        background: 'rgba(47, 133, 90, 0.08)',

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
    alignItems: 'center',
    gap: '0.5rem',
    textAlign: 'left',
    background: 'transparent',
    color: '$green_700',
    border: 'none',
    padding: '0.75rem 0.75rem',
    transition: '0.15s',
    userSelect: 'none',
    borderRadius: '0.375rem',
    textDecoration: 'none',

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

    '.dataSection': {
        '.actionsContainer': {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            padding: '0.25rem 0',

            button: {
                display: 'flex',
                flexDirection: 'row',
                gap: '0.25rem',
                background: 'none',
                border: 0,
                padding: '0.25rem',

                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                },

                '&:active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                },
            }
        },

        '.headerContainer': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '0.5rem',

            button: {
                display: 'none',
                background: 'none',
                border: 0,
                padding: '0.25rem',

                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                },

                '&:active': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)'
                },
            },

            '@media screen and (max-width: 768px)': {
                padding: '0.25rem 0',

                button: {
                    display: 'flex'
                },

                h2: {
                    lineHeight: 1,
                    margin: 0,
                    padding: 0
                }
            }
        }
    },

    '.lineSection': {
        maxWidth: '100%',
        maxHeight: '100%',
        height: '100%',
        overflow: 'auto',

        table: {
            th: {
                borderRight: 'solid 2px $black_150'
            }
        }
    }
})

export const Sidebar = styled('div', {
    '.sidebar': {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '$white',
        // backgroundColor: '#000',
        width: 'auto',
        maxHeight: 'calc(100vh - 4rem)',
        padding: '1.5rem',
        zIndex: 2,

        '@media screen and (max-width: 768px)': {
            position: 'absolute',
            height: '100vh',
            width: '70%',
            animation: `${slideRightAndFade} 0.15s`
        },

        '.userContainer': {
            display: 'flex',
            flexDirection: 'row',
            gap: '0.5rem',
            alignItems: 'center',
            padding: '0.25rem 0.5rem',
            width: '100%',

            '.userInfoContainer': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                textAlign: 'left',
                gap: 0,

                'span:first-child': {
                    fontWeight: 500,
                    color: 'rgba(0, 0, 0, 0.8)'
                },

                span: {
                    lineHeight: 'normal',
                    color: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },

        '.headerContainer': {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'center',
            justifyContent: 'center',

            h2: {
                padding: '0 0.5rem',
                justifyContent: 'left'
            },

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
        },
    },

    '.sidebarBackground': {
        display: 'none',
        position: 'absolute',
        height: '100vh',
        width: '100vw',
        zIndex: 1,
        backgroundColor: '$black_200',

        '@media screen and (max-width: 768px)': {
            display: 'flex'
        }
    },

    variants: {
        open: {
            true: {
                '@media screen and (max-width: 768px)': {
                    display: 'flex'
                }
            },
            false: {
                '@media screen and (max-width: 768px)': {
                    display: 'none'
                }
            }
        }
    }
})