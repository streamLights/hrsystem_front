import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Select, Row, Col, Button, AutoComplete, DatePicker, Upload, message, Modal, Timeline } from 'antd';
import moment from 'moment'

import MakeUpload from '../components/uploadImage'

import '../assets/css/sendresume.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const years = [1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020];

{/*        

    step1: 基本信息模块 

*/}

class stepOne extends Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            formContent: {
                "name": "",
                "birthday": "",
                "hightDegree": "",
                "email": "",
                "phone": "",
                "sex": "",
                "website": "",
                "worktime": "",
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (var key in values) {
                    sessionStorage.setItem(key, values[key]);
                }
                this.props.changeStep(2);
            }
        });
    }
    handleWebsiteChange(value) {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }
    componentWillMount() {
        let formContent = this.state.formContent;
        let content = {};
        for (var key in formContent) {
            if (key === 'birthday') {
                if (sessionStorage.getItem(key)) {
                    content[key] = moment(sessionStorage.getItem(key));
                    continue;
                } else {
                    content[key] = moment('Mon Jan 01 2018 11:23:21 GMT+0800');
                    continue;
                }
            }
            content[key] = sessionStorage.getItem(key);
        }
        this.setState({ formContent: content });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('name', {
                        initialValue: this.state.formContent.name,
                        rules: [{ required: true, message: '请告诉我们你的尊姓大名!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="性别"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('sex', {
                        initialValue: this.state.formContent.sex,
                        rules: [{ required: true, message: '请输入你的性别!' }],
                    })(
                        <Select>
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="出生日期"
                >
                    {getFieldDecorator('birthday', {
                        initialValue: this.state.formContent.birthday,
                        rules: [{ required: true, message: '告诉我们你的生日!当天有惊喜福利!' }],
                    })(
                        <DatePicker onChange={this.onChangeBirthday} />
                    )}
                </FormItem>
                <FormItem
                    label="最高学历"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('hightDegree', {
                        initialValue: this.state.formContent.hightDegree,
                        rules: [{ required: true, message: '请输入你的最高学历!' }],
                    })(
                        <Select>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="工作年限"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 8 }}
                >
                    {getFieldDecorator('worktime', {
                        initialValue: this.state.formContent.worktime,
                        rules: [{ required: true, message: '请输入你的工作年限!' }],
                    })(
                        <Select>
                            <Option value="1">1年</Option>
                            <Option value="2">2年</Option>
                            <Option value="3">3年</Option>
                            <Option value="4">4年</Option>
                            <Option value="5">5年</Option>
                            <Option value="6">6年</Option>
                            <Option value="7">7年</Option>
                            <Option value="8">8年</Option>
                            <Option value="9">9年</Option>
                            <Option value="10">10年</Option>
                            <Option value="more">10年以上</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('phone', {
                        initialValue: this.state.formContent.phone,
                        rules: [
                            { required: true, message: '请输入手机号码!方便我们联系' },
                            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '格式有误！输入格式为手机号！' }
                        ],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('email', {
                        initialValue: this.state.formContent.email,
                        rules: [{
                            type: 'email', message: '该邮箱格式不合法!',
                        }, {
                            required: true, message: '请输入联系邮箱!方便我们送上热腾腾的offer',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            社交账号主页地址&nbsp;
              <Tooltip title="一行URL倾注了你的所有才华!">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('website', {
                        initialValue: this.state.formContent.website,
                        rules: [{ required: true, message: '请输入链接!' }],
                    })(
                        <AutoComplete
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                            placeholder="website"
                        >
                            <Input />
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}
const StepOne = Form.create()(stepOne);

{/*        
                                 
    step2: 教育经历模块 

*/}
class stepTwo extends Component {
    constructor() {
        super();
        this.state = {
            formContent: {
                collage: '',
                profess: '',
                degree: '',
                graduation: ''
            }
        }
        this.goback = this.goback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (var key in values) {
                    sessionStorage.setItem(key, values[key]);
                }
                this.props.changeStep(3);
            }
        });
    }
    goback() {
        this.props.changeStep(1);
    }
    componentWillMount() {
        let formContent = this.state.formContent;
        let content = {};
        for (var key in formContent) {
            content[key] = sessionStorage.getItem(key);
        }
        this.setState({ formContent: content });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="学校名称"
                >
                    {getFieldDecorator('collage', {
                        initialValue: this.state.formContent.collage,
                        rules: [{ required: true, message: '请输入学校名称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="所学专业"
                >
                    {getFieldDecorator('profess', {
                        initialValue: this.state.formContent.profess,
                        rules: [{ required: true, message: '请输入所学专业!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="学历"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('degree', {
                        initialValue: this.state.formContent.degree,
                        rules: [{ required: true, message: '请选择学历!' }],
                    })(
                        <Select>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                            <Option value="其他">其他</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="毕业年份"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('graduation', {
                        initialValue: this.state.formContent.graduation,
                        rules: [{ required: true, message: '请选择毕业年份!' }],
                    })(
                        <Select>
                            {
                                years.map(function (year) {
                                    return <Option key={year}>{year}</Option>
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button onClick={this.goback}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}
const StepTwo = Form.create()(stepTwo);



{/*        
                                 
    step3: 期望工作模块

*/}
class stepThree extends Component {
    constructor() {
        super();
        this.state = {
            formContent: {
                job: '',
                jobState: '',
                city: '',
                salary: ''
            }
        }
        this.goback = this.goback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                for (var key in values) {
                    sessionStorage.setItem(key, values[key]);
                }
                this.props.changeStep(4);
            }
        });
    }
    goback() {
        this.props.changeStep(2);
    }
    componentWillMount() {
        let formContent = this.state.formContent;
        let content = {};
        for (var key in formContent) {
            content[key] = sessionStorage.getItem(key);
        }
        this.setState({ formContent: content });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="期望职位"
                >
                    {getFieldDecorator('job', {
                        initialValue: this.state.formContent.job,
                        rules: [{ required: true, message: '请输入期望职位!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="工作状态"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 3 }}>
                    {getFieldDecorator('jobState', {
                        initialValue: this.state.formContent.jobState,
                        rules: [{ required: true, message: '告诉我们你渴望的薪水!' }],
                    })(
                        <Select>
                            <Option value="全职">全职</Option>
                            <Option value="兼职">兼职</Option>
                            <Option value="实习">实习</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="期望城市"
                >
                    {getFieldDecorator('city', {
                        initialValue: this.state.formContent.city,
                        rules: [{ required: true, message: '世界那么大？你想去哪儿?', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="期望月薪"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 6 }}
                >
                    {getFieldDecorator('salary', {
                        initialValue: this.state.formContent.salary,
                        rules: [{ required: true, message: '告诉我们你渴望的薪水!' }],
                    })(
                        <Select>
                            <Option value="2k以下">2k以下</Option>
                            <Option value="2k-5k">2k-5k</Option>
                            <Option value="5k-10k">5k-10k</Option>
                            <Option value="10k-15k">10k-15k</Option>
                            <Option value="15k-25k">15k-25k</Option>
                            <Option value="25k-50k">25k-50k</Option>
                            <Option value="50k以上">50k以上</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button onClick={this.goback}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}
const StepThree = Form.create()(stepThree);


{/*        
                                 
    step4: 工作经历

*/}
class stepFour extends Component {
    constructor() {
        super();
        this.state = {
            hasWorkExp: false,        // 用户是否录入工作经历
            showInput: true,          // 控制是否显示增加工作经历表单
            formContent: [
                {
                    company: '',
                    historyJob: '',
                    rangeTime: '',
                    jobContent: ''
                }
            ]
        }
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addWorkExp = this.addWorkExp.bind(this);
        this.cancleInput = this.cancleInput.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let work = {},
                workExp = sessionStorage.getItem("workExperience");
            if (!err) {
                for (var key in values) {
                    work[key] = values[key];
                }
                if (workExp) {
                    let newWorkExp = workExp + '#@@&@!(' + JSON.stringify(work);
                    sessionStorage.setItem("workExperience", newWorkExp);
                    this.handleChangeState();
                } else {
                    sessionStorage.setItem("workExperience", JSON.stringify(work));
                    this.handleChangeState();
                }
            }
        });
    }
    goBack() {
        this.props.changeStep(3);
    }
    goNext() {
        this.props.changeStep(5);
    }
    addWorkExp() {
        this.setState({ showInput: true });
    }
    cancleInput() {
        this.setState({ showInput: false });
    }
    handleChangeState() {
        let workExperience = sessionStorage.getItem('workExperience');
        if (workExperience) {
            let workArr = workExperience.split('#@@&@!(');
            workArr.map(function (item, index) {
                workArr[index] = JSON.parse(item);
            });
            this.setState({ showInput: false, formContent: workArr, hasWorkExp: true });
        }
    }
    componentWillMount() {
        this.handleChangeState();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div>
                <div className={this.state.hasWorkExp ? "" : "hidden"}>
                    {
                        this.state.formContent.map(function (item, index) {
                            return (
                                <div className="workHis" key={index}>
                                    <p className="company">{item.company}</p>
                                    <span className="jobHis">{item.historyJob}</span><span className="rangeTime">{moment(item.rangeTime[0]).format('YYYY-MM-D')}&nbsp;——&nbsp;{moment(item.rangeTime[1]).format('YYYY-MM-D')}</span>
                                    <div className="jobContent">{item.jobContent}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Form className={this.state.showInput ? "" : "hidden"} onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="公司"
                        >
                            {getFieldDecorator('company', {
                                rules: [{ required: true, message: '请输入公司名称!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="职位"
                        >
                            {getFieldDecorator('historyJob', {
                                rules: [{ required: true, message: '请输入所任职位!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="在职时间"
                        >
                            {getFieldDecorator('rangeTime', {
                                rules: [{ type: 'array', required: true, message: '请选择在职时间!' }],
                            })(
                                <RangePicker />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="工作内容"
                        >
                            {getFieldDecorator('jobContent', {
                                rules: [{ required: true, message: '请输入工作内容!', whitespace: true }],
                            })(
                                <TextArea autosize={{ minRows: 4 }} />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 16, offset: 8 },
                            }}
                        >
                            <Button className={this.state.hasWorkExp ? "hidden" : ""} onClick={this.goBack}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className={this.state.hasWorkExp ? "" : "hidden"} onClick={this.cancleInput}>取&nbsp;消</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className={this.state.showInput ? "hidden" : "addWorkExpContainer"} >
                    <Icon className="addWorkExp" type="plus" onClick={this.addWorkExp}></Icon>
                </div>
                <div className={this.state.showInput ? "hidden" : "buttonContainer"}>
                    <Button onClick={this.goBack}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.goNext}>下一步</Button>
                </div>
            </div >
        )
    }
}
const StepFour = Form.create()(stepFour);

{/*        
                                 
    step5: 项目经验
    *** step5因逻辑和step4一模一样，因此是直接copy过来的，所以变量名会对不上操作的逻辑
*/}
class stepFive extends Component {
    constructor() {
        super();
        this.state = {
            hasWorkExp: false,
            showInput: true,
            formContent: [
                {
                    projectName: '',
                    duty: '',
                    projectDuring: '',
                    projectAbout: ''
                }
            ]
        }
        this.goBack = this.goBack.bind(this);
        this.goNext = this.goNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addWorkExp = this.addWorkExp.bind(this);
        this.cancleInput = this.cancleInput.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let project = {},
                projectExp = sessionStorage.getItem("projectExperience");
            if (!err) {
                for (var key in values) {
                    project[key] = values[key];
                }
                if (projectExp) {
                    let newProjectExp = projectExp + '#@@&@!(' + JSON.stringify(project);
                    sessionStorage.setItem("projectExperience", newProjectExp);
                    this.handleChangeState();
                } else {
                    sessionStorage.setItem("projectExperience", JSON.stringify(project));
                    this.handleChangeState();
                }
            }
        });
    }
    goBack() {
        this.props.changeStep(4);
    }
    goNext() {
        this.props.changeStep(6);
    }
    addWorkExp() {
        this.setState({ showInput: true });
    }
    cancleInput() {
        this.setState({ showInput: false });
    }
    handleChangeState() {
        let projectExperience = sessionStorage.getItem('projectExperience');
        if (projectExperience) {
            let projectkArr = projectExperience.split('#@@&@!(');
            projectkArr.map(function (item, index) {
                projectkArr[index] = JSON.parse(item);
            });
            this.setState({ showInput: false, formContent: projectkArr, hasWorkExp: true });
        }
    }
    componentWillMount() {
        this.handleChangeState();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <div>
                <div className={this.state.hasWorkExp ? "" : "hidden"}>
                    {
                        this.state.formContent.map(function (item, index) {
                            return (
                                <div className="workHis" key={index}>
                                    <p className="company">{item.projectName}</p>
                                    <span className="jobHis">{item.duty}</span><span className="rangeTime">{moment(item.projectDuring[0]).format('YYYY-MM-D')}&nbsp;——&nbsp;{moment(item.projectDuring[1]).format('YYYY-MM-D')}</span>
                                    <div className="jobContent">{item.projectAbout}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Form className={this.state.showInput ? "" : "hidden"} onSubmit={this.handleSubmit}>
                        <FormItem
                            {...formItemLayout}
                            label="项目名称"
                        >
                            {getFieldDecorator('projectName', {
                                rules: [{ required: true, message: '请输入项目名称!', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="你的职责"
                        >
                            {getFieldDecorator('duty', {
                                rules: [{ required: true, message: '请告诉我们你在该项目中承担了哪些责任?', whitespace: true }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="项目起止时间"
                        >
                            {getFieldDecorator('projectDuring', {
                                rules: [{ type: 'array', required: true, message: '请选择项目起止时间!' }],
                            })(
                                <RangePicker />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="项目描述"
                        >
                            {getFieldDecorator('projectAbout', {
                                rules: [{ required: true, message: '请告诉我们这个项目有多牛逼!', whitespace: true }],
                            })(
                                <TextArea autosize={{ minRows: 4 }} />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 16, offset: 8 },
                            }}
                        >
                            <Button className={this.state.hasWorkExp ? "hidden" : ""} onClick={this.goBack}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button className={this.state.hasWorkExp ? "" : "hidden"} onClick={this.cancleInput}>取&nbsp;消</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                </div>
                <div className={this.state.showInput ? "hidden" : "addWorkExpContainer"} >
                    <Icon className="addWorkExp" type="plus" onClick={this.addWorkExp}></Icon>
                </div>
                <div className={this.state.showInput ? "hidden" : "buttonContainer"}>
                    <Button onClick={this.goBack}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button type="primary" onClick={this.goNext}>下一步</Button>
                </div>
            </div >
        )
    }
}
const StepFive = Form.create()(stepFive);

{/*        
                                 
    step6: 自我描述

*/}
class stepSix extends Component {
    constructor() {
        super();
        this.state = {
            aboutMyself: ''
        }
        this.goback = this.goback.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                sessionStorage.setItem('aboutMyself', values.aboutMyself);
                this.props.changeStep(7);
            }
        });
    }
    goback() {
        this.props.changeStep(5);
    }
    componentWillMount() {
        let aboutMyself = sessionStorage.getItem('aboutMyself');
        if (aboutMyself) {
            this.setState({ aboutMyself: aboutMyself });
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="自我描述"
                >
                    {getFieldDecorator('aboutMyself', {
                        initialValue: this.state.aboutMyself,
                        rules: [{ required: true, message: '我们非常想了解一个出色的你!', whitespace: true }],
                    })(
                        <TextArea autosize={{ minRows: 6 }} />
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button onClick={this.goback}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}
const StepSix = Form.create()(stepSix);


{/* 
                                 
    step7: 作品展示

*/}
class stepSeven extends Component {
    constructor() {
        super();
        this.state = {
            filename: '',
            token: '',
            url: ''
        }
        this.goback = this.goback.bind(this);
    }

    handleSubmit() {
        let values = {
            _id: '',
            aboutMyself: '',
            birthday: '',
            city: '',
            collage: '',
            degree: '',
            email: '',
            goodResult: '',
            graduation: '',
            headImageUrl: '',
            hightDegree: '',
            job: '',
            jobState: '',
            name: '',
            phone: '',
            prefix: '',
            profess: '',
            projectExperience: '',
            salary: '',
            sex: '',
            website: '',
            workExperience: '',
            worktime: ''
        };
        for (var item in values) {
            values[item] = sessionStorage.getItem(item);
        }
        fetch('http://localhost:3111/upload/upresume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data && data.status != 0) {
                    message.error(data.msg);
                } else {
                    message.success(data.msg);
                }
            }, (err) => {
                message.error(err);
            });
    }
    goback() {
        this.props.changeStep(6);
    }
    componentWillMount() {
        // 从服务器获取上传凭证
        fetch('http://localhost:3111/upload/gettoken?bucket=productionimage', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 0) {
                    this.setState({ token: data.token });
                }
            }, (err) => { console.error(err) })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const _this = this;
        const props = {
            name: 'file',
            action: 'https://upload-z2.qiniup.com',
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                if (!isJPG) {
                    message.error('只支持上传jpg格式的图片!');
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    message.error('上传图片需要小于 2MB!');
                }
                if (isJPG && isLt2M) {
                    _this.setState({ filename: file.name });
                }
                return isJPG && isLt2M;
            },
            data: { token: this.state.token, key: this.state.filename + sessionStorage.getItem('phone') + new Date().getTime() },
            onChange(info) {
                if (info.file.status === 'done') {
                    let url = _this.state.url;
                    url = url + '#@@&@!(' + 'http://p6gbuepv2.bkt.clouddn.com/' + info.file.response.key;
                    _this.setState({ url: url });
                    sessionStorage.setItem('goodResult', url);
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="作品展示"
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload" /> 点击上传作品
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button onClick={this.goback}>上一步</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">提交简历</Button>
                </FormItem>
            </Form>
        )
    }
}
const StepSeven = Form.create()(stepSeven);


class Resume extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            step: 1
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    changeStep(step) {
        this.setState({ step: step });
    }
    // 控制上传头像的模态框
    showModal() {
        this.setState({ visible: true });
    }
    handleOk(e) {
        this.setState({ visible: false });
    }
    handleCancel(e) {
        this.setState({ visible: false });
    }
    // 写入时间戳
    componentDidMount() {
        let _id = sessionStorage.getItem('_id');
        if (!_id) {
            sessionStorage.setItem('_id', new Date().getTime());
        }
    }
    render() {
        return (
            <div>
                <div className="resumePage">
                    <div className="topImg"></div>
                    <div className="headImg" style={
                        sessionStorage.getItem('headImageUrl') ? { backgroundImage: 'url(' + sessionStorage.getItem('headImageUrl') + '-jvzhong?v=' + new Date().getTime() + ')' }
                            : { backgroundImage: "url('http://p6g8b7pfx.bkt.clouddn.com/head$%23&%25%25%2319960906.jpg')" }
                    } onClick={this.showModal} ></div>
                    <h2 className="resumeTitle">{
                        (() => {
                            switch (this.state.step) {
                                case 1: return "基本信息";
                                case 2: return "教育经历";
                                case 3: return '期望工作';
                                case 4: return "工作经历";
                                case 5: return "项目经验";
                                case 6: return '自我描述';
                                case 7: return "作品展示";
                                default: return null;
                            }
                        })()
                    }</h2>
                    {
                        (() => {
                            switch (this.state.step) {
                                case 1: return <StepOne changeStep={this.changeStep.bind(this)} />;
                                case 2: return <StepTwo changeStep={this.changeStep.bind(this)} />;
                                case 3: return <StepThree changeStep={this.changeStep.bind(this)} />;
                                case 4: return <StepFour changeStep={this.changeStep.bind(this)} />;
                                case 5: return <StepFive changeStep={this.changeStep.bind(this)} />;
                                case 6: return <StepSix changeStep={this.changeStep.bind(this)} />;
                                case 7: return <StepSeven changeStep={this.changeStep.bind(this)} />;
                                default: return null;
                            }
                        })()
                    }
                    <div className="timeline">
                        <Timeline>
                            <Timeline.Item dot={this.state.step === 1 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">基本信息</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 2 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">教育经历</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 3 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">期望工作</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 4 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">工作经历</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 5 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">项目经验</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 6 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">自我描述</Timeline.Item>
                            <Timeline.Item dot={this.state.step === 7 ? <Icon type="clock-circle-o" style={{ fontSize: '16px' }} /> : ''} color="blue">作品展示</Timeline.Item>
                        </Timeline>
                    </div>
                </div>
                <Modal title="上传照片"
                    okText="上传"
                    cancelText="取消"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="uploadImage">
                        <MakeUpload _id={sessionStorage.getItem('_id')} headType="jobFinder" />
                    </div>
                </Modal>
            </div>
        )
    }
}

const SendResume = Form.create()(Resume);
export default SendResume;