import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_SERVER } from '../Config';
import axios from 'axios';
import TagsInput from 'react-tagsinput';
import './CSS.css';

import Select from 'react-select';
import {
  FormGroup,
  Label,
  Badge,
  Modal,
  Container,
  ButtonGroup,
  Button,
} from 'reactstrap';
import GridItem from '../Grid/GridItem';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card.js';
import CardHeader from '../Card/CardHeader.js';
import GridContainer from '../Grid/GridContainer.js';
import CardBody from '../Card/CardBody.js';
import Table from '../Table/Table.js';
import { useSelector } from 'react-redux';

// import { bugs, website, server } from 'variables/general.js';s

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';

const useStyles = makeStyles(styles);
function Courses() {
  const [regularTags, setRegularTags] = React.useState([]);
  const handleTags = (regularTags) => {
    setRegularTags(regularTags);
  };
  const user = useSelector((state) => state.user);
  const fileInput = React.createRef();
  const [file, setFile] = React.useState(null);
  const classes = useStyles();
  const [majors, setmajors] = React.useState([]);
  const [addBtn, setAddBtn] = React.useState(false);
  const [name, setName] = React.useState('');
  const [nameA, setNameA] = React.useState('');
  const [smallAlert, setSmallAlert] = React.useState(false);
  const [coursesData, setCoursesData] = React.useState([]); // بيانات كل الماواد الخاصه باالتخصص المختار
  const [selectOptions, setSelectOptions] = React.useState([]); // قائمة التخصصات المتوفره
  const [successSelect, setSuccessSelect] = React.useState(); //  التخصص المختار من قائمه التخصصات
  const [code, setCode] = React.useState('');
  const [coursedelete, setCourseDelete] = React.useState();
  const [stop, setStop] = React.useState(true);

  let courseid = '';

  const getALLCourses = async () => {
    await axios
      .get(`${USER_SERVER}/courses`)
      .then((response) => {
        const data = response.data.data.data;
        let m = [];
        data.map((item, index) => {
          JSON.stringify(item.name);
          JSON.stringify(item.code);
          JSON.stringify(index);
          m = [
            ...m,
            [
              index + 1,
              item.name,
              item.code,
              index + 1,

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
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getOptions = async () => {
    await axios
      .get(`${USER_SERVER}/specialization`)
      .then((response) => {
        if (response.data) {
          const data = response.data.data.data;
          let options = data.map((courses) => ({
            value: courses._id,
            label: courses.specName,
          }));

          setSelectOptions(options);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRemove = () => {
    setFile(null);
    fileInput.current.value = null;
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
    };
    reader.readAsDataURL(file);
  };
  let m = [];
  const getCourses = async () => {
    await axios
      .get(`${USER_SERVER}/courses/?specialization=${successSelect.value}`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.data.data;
        data.map((item, index) => {
          JSON.stringify(item.name);
          JSON.stringify(item.code);
          JSON.stringify(item.title);
          JSON.stringify(item.article);
          JSON.stringify(item.chapters);
          JSON.stringify(index);
          m = [
            ...m,
            [
              index + 1,
              item.name,
              item.code,
              // item.title,
              // item.article,
              // item.chapters,
              index + 1,

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
        setCoursesData(m);
        setStop(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    if (successSelect) {
      getCourses();
    }
  }, []);
  React.useEffect(() => {
    getOptions();
    getALLCourses();
    setAddBtn(true);
  }, []);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleChangecode = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    await axios
      .post(
        `${USER_SERVER}/courses`,
        {
          name: name,
          nameA: nameA,
          code: code,
          specialization: successSelect.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        courseid = res.data.data._id;
        console.log(courseid);
      });

    regularTags.map((item, i) => {
      axios.post(
        `${USER_SERVER}/chapter`,
        {
          name: item,
          number: i + 1,
          course: courseid,
        },
        { withCredentials: true }
      );
    });
    let formData = new FormData();
    formData.set('file', file);
    await axios
      .put(
        `${USER_SERVER}/courses/${courseid}/photo`,
        formData,

        { withCredentials: true }
      )
      .then(window.location.reload());
  };

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
            ></button>
          </div>
          <div className="modal-body text-center">
            <h5>Are you sure you want to Delete this Course?</h5>
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
                  axios.delete(`${USER_SERVER}/courses/${coursedelete}`, {
                    withCredentials: true,
                  });
                  setSmallAlert(false);
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>COURSES</h4>
            <p className={classes.cardCategoryWhite}>All Courses Available</p>
          </CardHeader>
          <Container>
            <FormGroup style={{ paddingTop: '1rem' }}>
              {!addBtn && !successSelect ? <p>CHOOSE MAJOR FRIST</p> : null}
              <Select
                className="react-select react-select-success"
                classNamePrefix="react-select"
                name="successSelect"
                value={successSelect}
                onChange={function hendleOnChenga(value) {
                  setSuccessSelect(value);
                }}
                options={selectOptions}
                placeholder="Choose Major"
              />
            </FormGroup>
          </Container>
          <CardBody style={{ height: 365 }}>
            {addBtn ? (
              <div style={{ height: 280, overflowY: 'scroll' }}>
                <Table
                  tableHeaderColor="warning"
                  tableHead={[
                    'Number',
                    'Subjects',
                    'CODE',
                    'N.Students',
                    'Edit',
                    'Delete',
                  ]}
                  tableData={successSelect ? coursesData : majors}
                />
              </div>
            ) : (
              <div>
                {successSelect ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        value={name}
                        onChange={handleChange}
                        labelText="Course Name in English"
                        id="Course name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    '
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        value={nameA}
                        onChange={(e) => {
                          setNameA(e.target.value);
                        }}
                        labelText="الاسم بالعربي"
                        id="Course name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <CustomInput
                        labelText="Code"
                        id="Code"
                        value={code}
                        onChange={handleChangecode}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem
                      style={{ marginTop: '2rem', color: 'green' }}
                      container
                      direction="row-reverse"
                      justify="center"
                      alignItems="center"
                    >
                      <h6>ADD CHAPTERS</h6>
                    </GridItem>
                    <TagsInput
                      onChange={handleTags}
                      tagProps={{
                        className: 'react-tagsinput-tag badge-success',
                      }}
                      value={regularTags}
                    />
                  </GridContainer>
                ) : null}
              </div>
            )}

            <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              {!addBtn && name ? (
                <div>
                  <div className="fileinput text-center">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      ref={fileInput}
                    />

                    <div style={{ marginTop: '2rem' }}>
                      {file === null ? (
                        <Button
                          className="btn-link mr-1"
                          color="primary"
                          onClick={handleClick}
                        >
                          Add image
                        </Button>
                      ) : (
                        <span>
                          <Button
                            className="btn-link mr-1"
                            color="warning"
                            onClick={handleClick}
                          >
                            Change
                          </Button>

                          <Button
                            color="danger"
                            className="btn-round btn-link"
                            onClick={handleRemove}
                          >
                            <i className="fa fa-times" />
                            Remove
                          </Button>
                        </span>
                      )}
                    </div>
                  </div>
                  <Container>
                    <Button
                      className="btn-round "
                      color="success"
                      outline
                      type="submit"
                      style={{ marginTop: '1rem' }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Container>
                </div>
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
export default Courses;
