import tw from 'twin.macro';

const Side = tw.div`flex justify-center items-center gap-8`;
export const TopStyled = tw(Side)`col-start-2 row-start-1`;
export const LeftStyled = tw(Side)`col-start-1 row-start-2`;
export const RightStyled = tw(Side)`col-start-3 row-start-2`;
export const BottomStyled = tw(Side)`col-start-2 row-start-3`;
