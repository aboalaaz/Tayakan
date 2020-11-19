import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_SERVER } from '../Config';
import axios from 'axios';
import './CSS.css';
import Select from 'react-select';
import { FormGroup, Label, Badge, Modal } from 'reactstrap';
import GridItem from '../Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card.js';
import CardHeader from '../Card/CardHeader.js';
import GridContainer from '../Grid/GridContainer.js';
import CardBody from '../Card/CardBody.js';
import Table from '../Table/Table.js';
import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';

// import { bugs, website, server } from 'variables/general.js';s

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);
function Majors() {
  const user = useSelector((state) => state.user);

  const classes = useStyles();
  const [majors, setmajors] = React.useState([]);
  const [addBtn, setAddBtn] = React.useState(false);
  const [name, setName] = React.useState('');
  const [smallAlert, setSmallAlert] = React.useState(false);

  const [selectOptions, setSelectOptions] = React.useState([]); // قائمة التخصصات المتوفره
  const [successSelect, setSuccessSelect] = React.useState([]); //  التخصص المختار من قائمه التخصصات
  const [selectCourses, setSelectCourses] = React.useState([]); //  التخصص المختار من قائمه التخصصات
  const [code, setCode] = React.useState('');
  const [coursedelete, setCourseDelete] = React.useState();

  const getMajors = async () => {
    await axios
      .get(`${USER_SERVER}/specialization`)
      .then((response) => {
        if (response.data.success) {
          const data = response.data.data.data;
          let m = [];

          data.map(async (item, index) => {
            // await axios
            //   .get(`${USER_SERVER}/users?specialization=${item._id}`)
            //   .then((res) => {
            //     num = res.data.data.data.length;
            //   });
            m = [
              ...m,
              [
                index + 1,
                item.specName,
                item.code,
                <h3 className='text-center'>-</h3>,

                <Button
                  style={{ color: 'green' }}
                  className="btn-round btn-just-icon mr-1"
                  color="neutral"
                >
                  <i className="fa fa-pencil" />
                </Button>,
                <Button
                  style={{ color: 'red' }}
                  className="btn-round btn-just-icon mr-1"
                  color="neutral"
                  onClick={() => {
                    setSmallAlert(true);
                    setCourseDelete(item._id);
                  }}
                >
                  <i className="fa fa-remove" />
                </Button>,
              ],
            ];
          });
          setmajors(m);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getOptions = async () => {
    await axios
      .get(`${USER_SERVER}/courses`)
      .then((response) => {
        if (response.data) {
          const data = response.data.data.data;
          let options = data.map((courses) => ({
            value: courses._id,
            label: courses.name,
          }));

          setSelectOptions(options);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    getOptions();
    getMajors();
    setAddBtn(true);
  }, []);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChangecode = (e) => {
    setCode(e.target.value);
  };
  let course_id = [];
  selectCourses.map((item) => {
    course_id = [...course_id, item.value];
  });
  // };
  return (
    <GridContainer>
      {' '}
      <GridItem xs={12} sm={12}>
        <Modal
          size="sm"
          isOpen={smallAlert}
          toggle={() => setSmallAlert(false)}
        >
          <div className="modal-header no-border-header">
            <button
              className="close"
              type="button"
              onClick={() => setSmallAlert(false)}
            >
              ×
            </button>
          </div>
          <div className="modal-body text-center">
            <h5>Are you sure you want to Delete this Major?</h5>
          </div>
          <div className="modal-footer">
            <div className="left-side">
              <Button
                className="btn-link"
                color="success"
                type="button"
                onClick={() => setSmallAlert(false)}
              >
                Never mind
              </Button>
            </div>
            <div className="divider" />
            <div className="right-side">
              <Button
                className="btn-link"
                color="danger"
                type="button"
                onClick={() => {
                  axios.delete(
                    `${USER_SERVER}/specialization/${coursedelete}`,
                    { withCredentials: true }
                  );
                  setSmallAlert(false);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>MAJORS</h4>
            <p className={classes.cardCategoryWhite}>All majors available</p>
          </CardHeader>
          <CardBody style={{ height: 435 }}>
            {addBtn ? (
              <div
                style={{
                  height: 350,
                  overflowY: 'scroll',
                }}
              >
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    'Number',
                    'MAJORS',
                    'CODE',
                    'N.Students',
                    'Edit',
                    'Delete',
                  ]}
                  tableData={majors}
                />
              </div>
            ) : (
              <div>
                <Grid container spacing={3}>
                  <GridItem xs={8}>
                    <div style={{ gridColumnEnd: 'span 4' }}>
                      <CustomInput
                        value={name}
                        onChange={handleChange}
                        labelText="Major Name"
                        id="Course name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </div>
                  </GridItem>
                  <div style={{ gridColumnEnd: 'span 8' }}>
                    <GridItem xs={8}>
                      <CustomInput
                        labelText="Code if any"
                        id="Code"
                        value={code}
                        onChange={handleChangecode}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </div>
                </Grid>
                <FormGroup style={{ paddingTop: '2rem' }}>
                  <Label>
                    Choose a commen courses from other majors if there is:
                  </Label>
                  <Select
                    className="react-select react-select-success"
                    classNamePrefix="react-select"
                    name="successSelect"
                    value={successSelect}
                    onChange={function hendleOnChenga(value) {
                      setSuccessSelect(value);
                      setSelectCourses([...selectCourses, value]);
                    }}
                    options={selectOptions}
                    placeholder="Choose Courses"
                  />
                </FormGroup>
              </div>
            )}
            <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              {!addBtn && selectCourses
                ? selectCourses.map((course) => {
                    return (
                      <Badge className="" color="success" pill>
                        <small>{course.label} </small>{' '}
                      </Badge>
                    );
                  })
                : null}
            </GridItem>
            <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              {!addBtn && name ? (
                <Button
                  className="btn-round "
                  color="success"
                  outline
                  type="submit"
                  style={{ marginTop: '1rem' }}
                  onClick={async () => {
                    await axios.post(
                      `${USER_SERVER}/specialization`,
                      {
                        specName: name,
                        code: code,
                        courses: course_id,
                      },
                      { withCredentials: true }
                    );
                    setAddBtn(true);
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  className="btn-round "
                  color="warning"
                  outline
                  type="button"
                  style={{ marginTop: '1rem' }}
                  onClick={() => {
                    {
                      addBtn ? setAddBtn(false) : setAddBtn(true);
                    }
                  }}
                >
                  {addBtn ? 'ADD' : 'BACK'}
                </Button>
              )}
            </GridItem>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
export default Majors;
