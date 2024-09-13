import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./service.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../../service/auth";
import toast from 'react-hot-toast';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}




export default function EditServiseTabs({ setOpen, id, getData1 }) {
  const [value, setValue] = useState(0);
  const [img, setImg] = useState();
  const [img2, setImg2] = useState();

  const [data, setData] = useState({
    ru_name: "",
    en_name: "",
    fi_name: "",
    gl_name: "",
    ru_name2: "",
    en_name2: "",
    fi_name2: "",
    gl_name2: "",
    ru_content: "",
    en_content: "",
    fi_content: "",
    gl_content: "",
    ru_content2: "",
    en_content2: "",
    fi_content2: "",
    gl_content2: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (event, newValue) => {
    localStorage.setItem("e", JSON.stringify(event))
    setValue(newValue);
  };

  const imgURL = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result;
      setImg(url);
    };

    reader.readAsDataURL(e);
  };

  const imgURL2 = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      const url = reader.result;
      setImg2(url);
    };

    reader.readAsDataURL(e);
  };
  const ImageChange = (e) => {
    imgURL(e.target.files[0]);
  };

  const ImageChange2 = (e) => {
    imgURL2(e.target.files[0]);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/a_api/admin_panel/blog_deteiles_admin_views/${id}/`
      );
      let editData = data[0];
      setData({
        ...data,
        ru_name: editData?.translations.ru.title,
        ru_content: editData?.translations.ru.content,
        ru_name2: editData?.translations.ru.title2,
        ru_content2: editData?.translations.ru.content2,
        en_name: editData?.translations.en.title,
        en_content: editData?.translations.en.content,
        en_name2: editData?.translations.en.title2,
        en_content2: editData?.translations.en.content2,
        fi_name: editData?.translations.fi.title,
        fi_content: editData?.translations.fi.content,
        fi_name2: editData?.translations.fi.title2,
        fi_content2: editData?.translations.fi.content2,
        gl_name: editData?.translations.nl.title,
        gl_content: editData?.translations.nl.content,
        gl_name2: editData?.translations.nl.title2,
        gl_content2: editData?.translations.nl.content2,
      });
      getData1()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      // const token: string | undefined = Cookies.get(`token`);
      const postData = {
        img: img,
        img2: img2,
        title: data.ru_name,
        translations: {
          en: {
            title: data.en_name,
            title2: data.en_name2,
            content: data.en_content,
            content2: data.en_content2,
          },
          fi: {
            title: data.fi_name,
            title2: data.fi_name2,
            content: data.fi_name,
            content2: data.fi_name2,
          },
          nl: {
            title: data.gl_name,
            title2: data.gl_name2,
            content: data.gl_content,
            content2: data.gl_content2,
          },
          ru: {
            title: data.ru_name,
            title2: data.ru_name2,
            content: data.ru_content,
            content2: data.ru_content2,
          },
        },
      };
      const res = await axios.put(
        `${BASE_URL}/a_api/admin_panel/blog_deteiles_admin_views/${id}/`,
        postData
      );
      toast.success("Сервис успешно изменен");

      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitData}>
      <Box sx={{ width: "100%" }}>
        <p className="text-lightGreey flex w-[100%] justify-center mb-4 md:font-semibold md:text-[28px]">
        Изменить Блоги
        </p>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <label htmlFor="fileInput" className="custom-file-upload">
            <input
              type="file"
              id="fileInput"
              onChange={(e) => ImageChange(e)}
            />
            <span>Выберите файл</span>
          </label>
          <label htmlFor="fileInput2" className="custom-file-upload">
            <input
              type="file"
              id="fileInput2"
              onChange={(e) => ImageChange2(e)}
            />
            <span>Выберите файл (2)</span>
          </label>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Русский" {...a11yProps(0)} />
            <Tab label="Английский" {...a11yProps(1)} />
            <Tab label="Голландский" {...a11yProps(2)} />
            <Tab label="Финский" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <TextField
            id="outlined-basic"
            label="Имя (ru)"
            variant="outlined"
            sx={{ width: "100%" }}
            name="ru_name"
            value={data.ru_name}
            onChange={handleInputChange}
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Content (ru)"
            multiline
            rows={8}
            defaultValue=""
            sx={{ width: "100%", marginTop: "40px" }}
            name="ru_content"
            value={data.ru_content}
            onChange={handleInputChange}
            required
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TextField
            id="outlined-basic"
            label="Имя (en)"
            variant="outlined"
            sx={{ width: "100%" }}
            name="en_name"
            value={data.en_name}
            onChange={handleInputChange}
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Content (en)"
            multiline
            rows={8}
            defaultValue=""
            sx={{ width: "100%", marginTop: "40px" }}
            name="en_content"
            value={data.en_content}
            onChange={handleInputChange}
            required
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <TextField
            id="outlined-basic"
            label="Имя (gl)"
            variant="outlined"
            sx={{ width: "100%" }}
            name="gl_name"
            value={data.gl_name}
            onChange={handleInputChange}
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Content (gl)"
            multiline
            rows={8}
            defaultValue=""
            sx={{ width: "100%", marginTop: "40px" }}
            name="gl_content"
            value={data.gl_content}
            onChange={handleInputChange}
            required
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <TextField
            id="outlined-basic"
            label="Имя (fr)"
            variant="outlined"
            sx={{ width: "100%" }}
            name="fi_name"
            value={data.fi_name}
            onChange={handleInputChange}
            required
          />

          <TextField
            id="outlined-multiline-static"
            label="Content (fr)"
            multiline
            rows={8}
            defaultValue=""
            sx={{ width: "100%", marginTop: "40px" }}
            name="fi_content"
            value={data.fi_content}
            onChange={handleInputChange}
            required
          />
        </CustomTabPanel>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            sx={{ background: "red" }}
            type="button"
            variant="contained"
          >
            Закрывать
          </Button>
          <Button
            sx={{ background: "green" }}
            type="submit"
            variant="contained"
          >
            Изменить
          </Button>
        </Box>
      </Box>
    </form>
  );
}
