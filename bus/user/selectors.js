export const selectUserId = (state) => state.user.userId;
export const selectVisitCounts = (state) => state.user.visitCounts;
export const selectUserType = (state) => state.user.userType;

export const selectUser = (state) => (
  {
    userId: selectUserId(state),
    visitCounts: selectVisitCounts(state),
    userType: selectUserType(state),
  }
)
