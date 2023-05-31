const App = require("./DegreeCourseApplicationModel");
const UserService = require("../users/UserServices");
const DGService = require("../degreeCourse/degreeCourseService");
const { rejects } = require("assert");

// Get all
// function getDGApp(query, callback) {
//   App.find(query, async function (err, results) {
//     if (err) {
//       return callback(err, null);
//     } else {
//       let mappedApp = results.map(function (results) {
//         let userObject = UserService.findUserByID(
//           results.applicantUserID,
//           function (err, userResult) {
//             return (userObject = {
//               userID: userResult.userID,
//               firstName: userResult.firstName,
//               lastName: userResult.lastName,
//             });
//           }
//         );
//         console.log(userObject);
//         return {
//           id: results._id,
//           applicantUserID: results.applicantUserID,
//           courseDegreeID: results.courseDegreeID,
//           targetPeriodYear: results.targetPeriodYear,
//           targetPeriodShortName: results.targetPeriodShortName,
//         };
//       });
//       console.log(mappedApp);
//       return callback(null, mappedApp);
//     }
//   });
// }

function getDGApp(query, callback) {
  App.find(query, async function (err, results) {
    if (err) {
      return callback(err, null);
    } else {
      let mappedApp = await Promise.all(
        results.map(async function (result) {
          let userResult = await new Promise((resolve, reject) => {
            UserService.findUserByID(
              result.applicantUserID,
              function (err, userResult) {
                if (err) {
                  reject(err);
                } else {
                  resolve(userResult);
                }
              }
            );
          });

          let degreeResult = await new Promise((resolve, reject) => {
            DGService.findDGCourseByID(
              result.courseDegreeID,
              function (err, degreeResult) {
                if (err) {
                  reject(err);
                } else {
                  resolve(degreeResult);
                }
              }
            );
          });

          let userObject = {
            userID: userResult.userID,
            firstName: userResult.firstName,
            lastName: userResult.lastName,
          };

          let degreeObject = {
            degreeCourseID: degreeResult.id,
            degreeCourseName: degreeResult.name,
            degreeCourseShortName: degreeResult.shortName,
            universityName: degreeResult.universityName,
            universityShortName: degreeResult.universityShortName,
            departmentName: degreeResult.departmentName,
            departmentShortName: degreeResult.departmentShortName,
          };

          return {
            id: result._id,
            applicantUserID: result.applicantUserID,
            applicantFirstName: userObject.firstName,
            applicantLastName: userObject.lastName,
            courseDegreeID: result.courseDegreeID,
            targetPeriodYear: result.targetPeriodYear,
            targetPeriodShortName: result.targetPeriodShortName,
            degreeCourseName: degreeObject.degreeCourseName,
            degreeCourseShortName: degreeObject.degreeCourseShortName,
            universityName: degreeObject.universityName,
            universityShortName: degreeObject.universityShortName,
            departmentName: degreeObject.departmentName,
            departmentShortName: degreeObject.departmentShortName,
          };
        })
      );

      return callback(null, mappedApp);
    }
  });
}

function getAppByDG(degreeID, callback) {
  if (!degreeID) {
    return callback("No degree course was given.", null);
  }

  App.find({ courseDegreeID: degreeID }, function (err, results) {
    if (err) {
      return callback(err, null);
    } else {
      let mappedApp = results.map(function (results) {
        return {
          id: results._id,
          applicantUserID: results.applicantUserID,
          courseDegreeID: results.courseDegreeID,
          targetPeriodYear: results.targetPeriodYear,
          targetPeriodShortName: results.targetPeriodShortName,
        };
      });
      return callback(null, mappedApp);
    }
  });
}

function getUserDGApp(username, callback) {
  if (!username) {
    return callback("No username no application.", null);
  }

  App.find({ applicantUserID: username }, function (err, results) {
    if (err) {
      return callback(err, null);
    } else {
      let mappedApp = results.map(function (results) {
        return {
          id: results._id,
          applicantUserID: results.applicantUserID,
          courseDegreeID: results.courseDegreeID,
          targetPeriodYear: results.targetPeriodYear,
          targetPeriodShortName: results.targetPeriodShortName,
        };
      });

      return callback(null, mappedApp);
    }
  });
}

// Get One
async function getOneDGApp(id, callback) {
  if (!id) {
    return callback("Could not find application.", null);
  }

  try {
    const foundOne = await App.findOne({ _id: id });
    let mappedApp = {
      id: foundOne.id,
      applicantUserID: foundOne.applicantUserID,
      courseDegreeID: foundOne.courseDegreeID,
      targetPeriodYear: foundOne.targetPeriodYear,
      targetPeriodShortName: foundOne.targetPeriodShortName,
    };
    return callback(null, mappedApp);
  } catch (e) {
    return callback("Error while finding one application.", null);
  }
}

/**
 *  Über den Tokenheader holt es sich die userID
 *  Überprüfen, ob es die userID in der DB gibt
 *  Error, wenn:
 *      -> userID nicht vorhanden ist
 *      -> Tokenheader leer ist
 *
 *  Mittels req.body holt es sich die degreeID
 *  Error, wenn:
 *      -> degreeID nicht in DB existiert
 *      -> req.body leer oder unvollständig ist
 *
 *  Überprüfen, ob Daten legitim sind:
 *      - Kein vergangenes Bewerbungsjahr
 *      - Nur WiSe und SoSe sind als TargetPeriodShortName zugelassen
 *
 *  Muss der Bewerbung einem User zuweisen
 */

const checktargetPeriodShortName = function (targetPeriodShortName) {
  if (
    targetPeriodShortName.includes("WiSe") ||
    targetPeriodShortName.includes("SoSe")
  ) {
    return true;
  } else {
    return false;
  }
};
// Create One
function createDGApp(username, body, callback) {
  if (!username || !body) {
    return callback("Missing crucial information.", null);
  }

  const date = new Date().getFullYear();
  if (body.targetPeriodYear < date) {
    return callback("Cannot apply for past years. Enter a valid year.", null);
  }

  const targetPeriodShortName = body.targetPeriodShortName;
  const validtargetPeriodShortName = new checktargetPeriodShortName(
    targetPeriodShortName
  );

  UserService.findUserByID(username, function (err, result) {
    if (err) {
      return callback("Did not find user.", null);
    } else {
      DGService.findDGCourseByID(
        body.degreeCourseID,
        async function (err, result) {
          if (err) {
            return callback("Did not find degree course.", null);
          } else {
            let createBody = {
              applicantUserID: body.applicantUserID,
              courseDegreeID: body.degreeCourseID,
              targetPeriodYear: body.targetPeriodYear,
              targetPeriodShortName: body.targetPeriodShortName,
            };

            let typeApplicantUserID =
              typeof createBody.applicantUserID == "undefined";

            if (
              !typeApplicantUserID &&
              !(body.applicantUserID == username) &&
              !username.includes("admin")
            ) {
              return callback("You cannot apply for another user.", null);
            }

            if (typeApplicantUserID) {
              createBody = {
                applicantUserID: username,
                courseDegreeID: body.degreeCourseID,
                targetPeriodYear: body.targetPeriodYear,
                targetPeriodShortName: body.targetPeriodShortName,
              };
            }

            // if (createBody.applicantUserID == "admin") {
            //   return callback("Admin cannot create application.", null);
            // }

            if (validtargetPeriodShortName) {
              try {
                const doesDGexist = await App.findOne(createBody);
                if (doesDGexist) {
                  return callback("Application exists already.", null);
                }

                const application = await App.create(createBody);
                const mappedResult = {
                  id: application._id,
                  applicantUserID: application.applicantUserID,
                  courseDegreeID: application.courseDegreeID,
                  targetPeriodYear: application.targetPeriodYear,
                  targetPeriodShortName: application.targetPeriodShortName,
                };
                return callback(null, mappedResult);
              } catch (e) {
                return callback(e, null);
              }
            } else {
              return callback("Enter a valid application year.", null);
            }
          }
        }
      );
    }
  });
}

// Update One
async function updateDGApp(id, updateInfo, callback) {
  const date = new Date().getFullYear();
  if (updateInfo.targetPeriodYear < date) {
    return callback("Cannot apply for past years. Enter a valid year.", null);
  }

  if (!id) {
    return callback("Missing id. Cannot update nonexistant application.", null);
  }

  const updateSubset = {
    targetPeriodYear: updateInfo.targetPeriodYear,
    targetPeriodShortName: updateInfo.targetPeriodShortName,
  };

  try {
    const newUpdate = await App.findOneAndUpdate({ _id: id }, updateSubset, {
      new: true,
    });

    let mappedApplication = {
      id: newUpdate._id,
      applicantUserID: newUpdate.applicantUserID,
      courseDegreeID: newUpdate.courseDegreeID,
      targetPeriodYear: newUpdate.targetPeriodYear,
      targetPeriodShortName: newUpdate.targetPeriodShortName,
    };
    return callback(null, mappedApplication);
  } catch (e) {
    return callback("Could not update application.", null);
  }
}

// Delete One
function deleteDGApp(id, callback) {
  if (!id) {
    return callback("Cannot delete nonexistant application.", null);
  } else {
    let query = App.findOneAndDelete({ _id: id });
    query.exec(function (err, application) {
      if (err) {
        return callback("There was an error while deleting.", null);
      } else {
        return callback(null, application);
      }
    });
  }
}

module.exports = {
  getDGApp,
  getUserDGApp,
  getAppByDG,
  getOneDGApp,
  createDGApp,
  updateDGApp,
  deleteDGApp,
};
