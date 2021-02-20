import{observer as e}from"./node_modules/mobx-react-lite/es/index.js";import a,{createContext as r,useCallback as t,useContext as s,useMemo as o,useState as n,useEffect as i}from"../../node_modules/react/index.js";import{get as l,set as u,isEmpty as c,merge as h}from"lodash";import{observer as d}from"./node_modules/mobx-react/dist/mobxreact.esm.js";import{reaction as m,makeAutoObservable as v,set as f,toJS as p}from"./node_modules/mobx/dist/mobx.esm.js";var g=r(null);var y=e((function({children:e,validateOnBlur:r,form:s}){if(!s)return e;const{errors:o,values:n}=s,i=t((e=>{r&&s.validatePath(e)}),[r]);return a.createElement(g.Provider,{value:{values:n,onBlur:i,errors:o,form:s}},e)})),V=r({components:{form:{}}});function b(...e){return function(...a){for(let r of e)r&&r(...a)}}const x={asChange:{alias:"onChange",apply:e=>e},asValue:"value",asOnBlur:{alias:"onBlur"}};var B=d((({path:e,use:r,children:t,onChange:c,displayValue:h,defaultValue:d,...v})=>{const{values:f,errors:p,onBlur:y}=s(g),B=function(e){const a=s(V);return o((()=>a.components[e]),[e,a])}("form"),{...C}=a.useMemo((()=>B[r]||v),[B,r]),{asValue:P=x.asValue,asChange:w=[],asOnBlur:E=x.asOnBlur.alias}=C,[j=x.asChange.alias]=w,O=a.useMemo((()=>w[1]?"function"==typeof w[1]?w[1]:"string"==typeof w[1]?e=>l(e,w[1]):void 0:x.asChange.apply),[w]);function _(){const a=l(f,e);return h?h(a):a}const k=a.useCallback((()=>_()||d||function(e=String){switch(e){case String:return"";case Number:return 0;case Boolean:return!1}}(C.type)),[C.type]),[F,M]=n(k);i((()=>m((()=>l(f,e)),(()=>{M(_())}))),[]);const S={[P]:F,[j]:b(((...a)=>u(f,e,O(...a))),c),[E]:()=>y(e),error:l(p,e)},A=a.Children.only(t);return a.cloneElement(A,{key:e,...S},A.props.children)}));const C=({components:e,children:r})=>a.createElement(V.Provider,{value:{components:e}},r);class P{constructor({initialValues:e,validator:a}){this.errors={},this.values={},this.values=e||{},this.validator=a,v(this)}async validateAll(){f(this.errors,await this.validator(this.values))}get isValid(){if(!this.validator)return!1;const e=this.validator(this.values);return c(e)}async validatePath(e){this.setPathError(e,await this.validator(this.values,e))}setPathError(e,a){u(this.errors,e,a)}setValues(e){this.values=h(p(this.values),e)}setPathValue(e,a){f(this.values,e,a)}get raw(){return p(this.values)}}function w({initialValues:e,validator:a}={}){return o((()=>new P({initialValues:e,validator:a})),[a])}export{B as Field,y as Form,C as FormProvider,w as useForm};
