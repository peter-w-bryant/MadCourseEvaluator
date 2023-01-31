/**
 * Authors: Aidan Shine, Bryan Li, Jarvis Jia, Peter Bryant, Swathi Annamaneni, Tong Yang
 * Revision History: 11/01/2022:12/12/2022
 * Organization: Madgers
 * Version: 1.0.0
 */

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";

import Header from "../helper/Header";
import GPAGraph from "./GPAGraph";
import Reddit from "./Reddit";
import ProfessorList from "./ProfessorList";

/**
 * Course: displays Header and all course info: basic course info, cumulative
 * GPA graph, list of reddit comments, and info on instructors that teach that
 * course.
 * @returns Course React element
 *
 * @component
 */
const Course = () => {
  const courseID = useParams().id; // get the value of the id param

  const [courseJSON, setCourseJSON] = useState({}); // useState hook to store JSON
  const [courseInfo, setCourseInfo] = useState({}); // useState hook to store the courseInfo
  const [redditList, setRedditList] = useState([]); // useState hook to store the redditList
  const [graphInfo, setGraphInfo] = useState({}); // useState hook to store the graphInfo
  const [professorList, setProfessorList] = useState([]); // useState hook to store the professorList
  const [profGraphInfo, setProfGraphInfo] = useState([]); // useState hook to store the profGraphInfo

  useEffect(() => {
    // fetch("/course" + courseID).then((response) =>
    fetch("/course").then((response) =>
      response.json().then((json) => {
        setCourseJSON(json);
      })
    );
  }, []);

  useEffect(() => {
    // fetch("/course" + courseID).then((response) =>
    fetch("/course").then((response) =>
      response.json().then((json) => {
        // key: course-info
        setCourseInfo(json["course-info"]);

        // key: grade_distribution
        const grade_distribution = json["grade_distribution"];
        if (
          grade_distribution &&
          grade_distribution["professor_cumulative_grade_distribution"]
        )
          setProfGraphInfo(
            grade_distribution["professor_cumulative_grade_distribution"]
          );
        else setProfGraphInfo({});

        // if the graph is not empty
        if (
          grade_distribution &&
          grade_distribution.cumulative &&
          !(
            grade_distribution.cumulative.aCount === 0 &&
            grade_distribution.cumulative.abCount === 0 &&
            grade_distribution.cumulative.bCount === 0 &&
            grade_distribution.cumulative.bcCount === 0 &&
            grade_distribution.cumulative.cCount === 0 &&
            grade_distribution.cumulative.dCount === 0 &&
            grade_distribution.cumulative.fCount === 0
          )
        )
          setGraphInfo([
            { name: "A", grade: grade_distribution.cumulative.aCount },
            { name: "AB", grade: grade_distribution.cumulative.abCount },
            { name: "B", grade: grade_distribution.cumulative.bCount },
            { name: "BC", grade: grade_distribution.cumulative.bcCount },
            { name: "C", grade: grade_distribution.cumulative.cCount },
            { name: "D", grade: grade_distribution.cumulative.dCount },
            { name: "F", grade: grade_distribution.cumulative.fCount },
          ]);
        else setGraphInfo([]);

        // key: reddit_comments
        const reddit_comments = json["reddit_comments"];
        var comments = [];
        // for each comment in the json response, create a new object with the comment body, comment link, and number of votes
        for (var key in reddit_comments) {
          const id = key;
          const body = reddit_comments[key].comBody;
          const link = reddit_comments[key].comLink;
          const votes = reddit_comments[key].comVotes;

          comments.push({ id, body, link, votes }); // push the new object to the comments list
        }
        comments.sort((a, b) => {
          // Sorting in descending order based on upvotes
          return b.votes - a.votes;
        });
        setRedditList(comments); // set the RedditList state as the comments array
      })
    );
  }, [courseJSON]);

  useEffect(() => {
    // key: course-profs
    const course_profs = courseJSON["course-profs"];
    var professors = [];
    // For professor course in the json response, create a new object with
    // the professor name, rate my professor rating, department, rate my
    // professor rating class, and professor ID
    for (var key in course_profs) {
      const name = course_profs[key].name;
      const RMPRating = course_profs[key].RMPRating;
      const dept = course_profs[key].dept;
      const RMPRatingClass = course_profs[key].RMPRatingClass;
      const id = key;

      let graph = {}; // populate professor graph with prof-specific GPA's
      console.log(profGraphInfo);
      if (profGraphInfo.hasOwnProperty(id)) {
        // dependency
        const temp = profGraphInfo[id];
        console.log(temp);
        if (
          // if no prof graph info exists, make an empty graph
          temp.aCount === 0 &&
          temp.abCount === 0 &&
          temp.bCount === 0 &&
          temp.bcCount === 0 &&
          temp.cCount === 0 &&
          temp.dCount === 0 &&
          temp.fCount === 0
        )
          graph = [];
        // otherwise, set the values of graph to
        else
          graph = [
            { name: "A", grade: temp.aCount ?? 0 },
            { name: "AB", grade: temp.abCount ?? 0 },
            { name: "B", grade: temp.bCount ?? 0 },
            { name: "BC", grade: temp.bcCount ?? 0 },
            { name: "C", grade: temp.cCount ?? 0 },
            { name: "D", grade: temp.dCount ?? 0 },
            { name: "F", grade: temp.fCount ?? 0 },
          ];
      }
      professors.push({ name, RMPRating, dept, RMPRatingClass, id, graph });
    }
    setProfessorList(professors); //set the ProfessorList state as the professors array
  }, [courseJSON, profGraphInfo]);

  return (
    <Container className="full">
      <Row>
        <Header />
      </Row>

      <Container className="grey-box full">
        {
          /* Course Name */
          courseInfo.cName && (
            <Row>
              <h3 className="bold-heading-style">{courseInfo.cName}</h3>
            </Row>
          )
        }

        {
          /* Course Code */
          courseInfo.cCode && (
            <Row className="heading-style">
              <h3>{courseInfo.cCode}</h3>
            </Row>
          )
        }

        <Row>
          {
            /* Course Subject */
            courseInfo.cSubject && (
              <Col>
                <Row>
                  <h5 className="bold-heading-style">Subject</h5>
                </Row>
                <Row>
                  <h5 className="heading-style">{courseInfo.cSubject}</h5>
                </Row>
              </Col>
            )
          }

          {
            /* Course Credits */
            courseInfo.cSubject && (
              <Col>
                <Row>
                  <h5 className="bold-heading-style">Credits</h5>
                </Row>
                <Row>
                  <h5 className="heading-style">{courseInfo.cCredits}</h5>
                </Row>
              </Col>
            )
          }
        </Row>

        {
          /* Course Description */
          courseInfo.cSubject && (
            <>
              <Row>
                <h5 className="bold-heading-style">Description</h5>
              </Row>
              <Row>
                <h5 className="heading-style">{courseInfo.cDescription}</h5>
              </Row>
            </>
          )
        }

        {
          /* Course Requisites */
          courseInfo.cReq && (
            <Row>
              <h5 className="heading-style">
                <b>Requisites</b>
                {": " + courseInfo.cReq}
              </h5>
            </Row>
          )
        }

        {/* Cumulative Course GPA Graph and Reddit*/}
        <Row>
          {graphInfo && // if there is graph data and reddit data, make a row to
          // hold them
          graphInfo.length > 0 &&
          redditList &&
          redditList.length > 0 ? (
            <Col>
              {graphInfo && graphInfo.length > 0 ? ( // if there is graph data, display the graph
                <div xs={12} lg={6} className="graph-box">
                  <GPAGraph graphInfo={graphInfo} />
                </div>
              ) : (
                <></>
              )}

              {redditList && redditList.length > 0 ? ( // if there is reddit info display reddit comments
                <Row xs={12} md={6} className="reddit-box">
                  <Reddit redditList={redditList} />
                </Row>
              ) : (
                <></>
              )}
            </Col>
          ) : (
            <></>
          )}

          {/* Professor List and Associating Professor GPA Graph(s) */}
          {professorList && professorList.length > 0 ? (
            <Col xs={12} lg={6}>
              <Row>
                <h5 className="bold-heading-style">Instructors</h5>
              </Row>
              <Row xs={12} lg={6} className="professor-list-container">
                {<ProfessorList professorList={professorList} />}
              </Row>
            </Col>
          ) : (
            // if there is no prof info, tell the user
            <>
              <h5 className="heading-style">
                No Intructor Info found for this course
              </h5>
            </>
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default Course;
