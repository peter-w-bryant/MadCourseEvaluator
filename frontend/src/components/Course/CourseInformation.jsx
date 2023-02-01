import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

/**
 * todo
 * CourseInformation: display relative course information.
 * This component is used by Course.
 * @param {*} graphInfo data to be displayed in graph, determined in Course
 * @returns GPAGraph React element
 *
 * @component
 * @example
 * graphInfo = [
 *  { name: "A", grade: 0 },
 *  { name: "AB", grade: 0 },
 *  { name: "B", grade: 0 },
 *  { name: "BC", grade: 0 },
 *  { name: "C", grade: 0 },
 *  { name: "D", grade: 0 },
 *  { name: "F", grade: 0 }]
 * <GPAGraph graphInfo={graphInfo} />
 */
const CourseInformation = ({ courseInfo }) => {
  // courseInfo, graphInfo set in Course component
  return (
    <Container>
      {
        /* Course Name */
        courseInfo && courseInfo.cName && (
          <Row>
            <h3 className="bold-heading-style">{courseInfo.cName}</h3>
          </Row>
        )
      }

      {
        /* Course Code */
        courseInfo && courseInfo.cCode && (
          <Row className="heading-style">
            <h3>{courseInfo.cCode}</h3>
          </Row>
        )
      }

      <Row>
        {
          /* Course Subject */
          courseInfo && courseInfo.cSubject && (
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
          courseInfo && courseInfo.cSubject && (
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
        courseInfo && courseInfo.cSubject && (
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
        courseInfo && courseInfo.cReq && (
          <Row>
            <h5 className="heading-style">
              <b>Requisites</b>
              {": " + courseInfo.cReq}
            </h5>
          </Row>
        )
      }
    </Container>
  );
};

export default CourseInformation;
